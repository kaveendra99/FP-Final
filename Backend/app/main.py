import time
import requests
import pandas as pd
import streamlit as st
import streamlit.components.v1 as components

is_upload_disabled = False
is_camera_disabled = True
is_loading = False

st.set_page_config(
    page_title="Waste Detection and Management", page_icon=":recycle:", layout="wide"
)

st.title("Waste :wastebasket: Detection and Management :recycle: ")

col1, col2 = st.columns(2, gap="large")
send_col, clear_col = st.columns(2)

if "is_upload_disabled" not in st.session_state:
    st.session_state.is_upload_disabled = False

if "is_camera_disabled" not in st.session_state:
    st.session_state.is_camera_disabled = False

if "is_loading" not in st.session_state:
    st.session_state.is_loading = False


def toggle_upload():
    st.session_state.is_upload_disabled = False
    st.session_state.is_camera_disabled = True


def toggle_camera():
    st.session_state.is_camera_disabled = False
    st.session_state.is_upload_disabled = True


def on_send():
    if "image_data" in st.session_state:
        st.session_state.is_loading = True
        url = "http://127.0.0.1:8080/detect_img"
        headers = {"accept": "application/json", "x-api-key": "123456"}
        files = {
            "image_file": (
                st.session_state.image_data.name,
                st.session_state.image_data,
                "multipart/form-data",
            )
        }
        response = requests.post(url, files=files, headers=headers)
        st.session_state.response_data = response.json()
        st.session_state.is_loading = False
    else:
        st.session_state.is_loading = False


def on_clear():
    st.session_state.image_data = None
    del st.session_state.response_data
    st.session_state.is_loading = False
    st.session_state.is_upload_disabled = False
    st.session_state.is_camera_disabled = False


with st.container():
    with col1:
        uploaded_file = st.file_uploader(
            "Upload a waste item Image :frame_with_picture: :wastebasket:",
            type=["png", "jpg", "jpeg", "webp"],
            disabled=st.session_state.is_upload_disabled,
            on_change=toggle_upload,
        )
        if uploaded_file is not None:
            st.session_state.image_data = uploaded_file

        picture = st.camera_input(
            "Take a picture of a waste item :camera_with_flash: :wastebasket:",
            disabled=st.session_state.is_camera_disabled,
            on_change=toggle_camera,
        )
        if picture is not None:
            st.session_state.image_data = picture
        with st.container():
            with send_col:
                send = st.button(
                    "Send :arrow_forward:", on_click=on_send, use_container_width=True
                )

            with clear_col:
                st.button(
                    "Clear 	:x:",
                    type="primary",
                    on_click=on_clear,
                    use_container_width=True,
                )

    with col2:
        if "response_data" not in st.session_state and not st.session_state.is_loading:
            st.info(
                "Please upload an image :frame_with_picture: or take a picture :camera_with_flash:"
            )
        else:
            with st.spinner("Please wait..."):
                while st.session_state.is_loading:
                    time.sleep(0.1)
                    st.spinner(text="Loading...")
            if (
                "response_data" in st.session_state
                and st.session_state.response_data is not None
                and st.session_state.response_data["error"] is None
            ):
                image_url = st.session_state.response_data["imageURL"]
                st.image(
                    f"http://127.0.0.1:8080{image_url}",
                    use_column_width=True,
                )
                st.json(st.session_state.response_data)
            else:
                st.error("Ooops something went wrong!")

with st.container():
    if (
        "response_data" in st.session_state
        and st.session_state.response_data["error"] is None
    ):
        st.subheader("Nearest Recycling Center :recycle:")
        # 6.895335034457855, 79.8556801047448
        df = pd.DataFrame({"lat": [6.895335034457855], "lon": [79.8556801047448]})
        st.map(
            data=df,
            color="#008000",
            size=10,
            longitude="lon",
            latitude="lat",
            zoom=16,
        )
        # components.iframe(
        #     "https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        # )
