import { useState } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import firebase from "firebase"
import {postArticleAPI} from "../actions"



const PostModal= (props) =>{

    const [editorText, setEditorText] = useState("");
    const [shareImage,setShareImage] = useState("");
    const [videoLink, setVideoLink] = useState("");
    const [assetArea, setAssetArea] = useState("");

    const handleChange = (e) =>{

        const image = e.target.files[0];
        if (image === "" || image===undefined) {
            alert(`Not an image, the file is a ${typeof image}`)
            return;

            
        }
        setShareImage(image);
    };
    const switchAssetArea = (area) =>{
        setShareImage("");
        setVideoLink("");
        setAssetArea(area);



    };
    const  postArticle = (e) => {
        console.log('post malone :r')

        e.preventDefault();
        if (e.target !== e.currentTarget) {
            console.log("hello")
            return;
            
        }

        const payload ={
            image : shareImage,
            video : videoLink,
            user : props.user,
            description : editorText,
            timestamp : firebase.firestore.Timestamp.now(),
        };
        props.postArticle(payload);
        reset(e);



    };

    const reset = (e)=>{
        setEditorText("");
        setShareImage("");
        setVideoLink("");
        setAssetArea("");
        props.handleClick(e);
    };



    return(
        <>{ props.showModal === 'open' && 
        <Container>
            <Content>


              <Header>
                  <h2>Create a post</h2>

                  <button onClick={(event)=> reset(event)}>

                  <img src="/images/close-icon.svg" alt="" />
                  </button>
              </Header>

              <SharedContent>



                  <UserInfo>

                      {props.user.photoURL ? (<img src={props.user.photoURL} />
                      ): (
                        <img src="/images/user.svg" alt="" />

                      )}


                  
                  <span>{props.user.displayName}</span>



                  </UserInfo>


                  <Editor>

                  <textarea  
                  value={editorText}
                  onChange={(e)=>setEditorText(e.target.value)}
                  placeholder="What do you want to talk about?"
                  autoFocus={true}
                  />
                  { assetArea ==='image' ? (

                  



                  <UploadImage>
                      <input 
                      type="file" 
                      accept="image/gif, image/jpeg, image/png"
                      name="image"
                      id="file"
                      style={{ display: "none" }}
					  onChange={handleChange}
                      />


                      <p>
                      <label htmlFor="file">Select an image to share</label>
                      </p>

                      {shareImage && <img src={URL.createObjectURL(shareImage)} alt="" />}
                    
                      </UploadImage>
                     ) : (
                    
                    assetArea === 'media' &&
                      <>
                      
                      <input
											type="text"
											name="video"
											id="videoLink"
											value={videoLink}
											placeholder="Enter the video link"
											onChange={(e) => setVideoLink(e.target.value)}
										/>

                                 {videoLink && 
                                 <ReactPlayer width={"100%"} url={videoLink} />
                                 }
                      
                      </>
                    )
                  }


                  
                  </Editor>
              </SharedContent>


              <ShareCreation>



                  <AttachAssets>

                      <AssetButton onClick={() => switchAssetArea("image")}>


                      <img src="/images/share-image.svg" alt="" />


                      </AssetButton>



                      <AssetButton onClick={() => switchAssetArea("media")} >


                          <img src="/images/share-video.svg" alt="" />
                  

                     </AssetButton>
                  </AttachAssets>
                  


                  <ShareComment>

                  <AssetButton>

                         <img src="/images/share-comment.svg" alt="" />
                          Anyone





                            </AssetButton>
                  </ShareComment>

                  <PostButton disabled={!editorText ? true : false}
                  onClick = {(event) => postArticle(event)}
                  >
                      Post
                      </PostButton>




              </ShareCreation>





            </Content>
        </Container>
          }
        </>
    );

}


const Container = styled.div`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 9999;
    color: black;
	background-color: rgba(0, 0, 0, 0.8);
	animation: fadeIn 0.3s ease;
`;

const Content = styled.div`
	width: 100%;
	max-width: 552px;
	max-height: 90%;
	background-color: white;
	overflow: initial;
	border-radius: 5px;
	position: relative;
	display: flex;
	flex-direction: column;
	top: 32px;
	margin: 0 auto;
`;

const Header = styled.div`
	display: block;
	padding: 16px 20px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.25);
	font-size: 26px;
	line-height: 1.5;
	color: rgba(0, 0, 0, 0.9);
	font-weight: 400;
	display: flex;
	justify-content: space-between;
	align-items: center;
    
    h2 {
		font-weight: 400;
	}
	button {
		width: 40px;
		height: 40px;
		min-width: auto;
		border: none;
		outline: none;
		background: transparent;
		img,
		svg {
			pointer-events: none;
		}
    }
    
    `;




const SharedContent = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	overflow-y: auto;
	vertical-align: baseline;
	background: transparent;
	padding: 5px 12px;
`;

const UserInfo = styled.div`
	display: flex;
	align-items: center;
	padding: 10px 24px;
	img {
		width: 48px;
		height: 48px;
		background-clip: content-box;
		border-radius: 50%;
		border: 2px solid transparent;
	}
	span {
		font-weight: 600;
		font-size: 16px;
		line-height: 1.5;
		margin-left: 5px;
	}
`;




const ShareCreation = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 10px 24px 10px 16px;
`;





const AssetButton = styled.button`
	display: flex;
	align-items: center;
	height: 40px;
	min-width: auto;
	margin-right: 8px;
	border-radius: 50%;
	border: none;
	outline: none;
	justify-content: center;
	background: transparent;
	&:hover {
		background: rgba(0, 0, 0, 0.08);
	}
`;

const AttachAssets = styled.div`
	display: flex;
	align-items: center;
	padding-right: 8px;
    ${AssetButton}{

        width: 40px;
    }
	
`;


const ShareComment = styled.div`
	padding-left: 8px;
	margin-right: auto;
	border-left: 1px solid rgba(0, 0, 0, 0.15);
	${AssetButton} {
		border-radius: 50px;
		padding: 5px 10px;
		span {
			font-size: 16px;
			font-weight: 600;
			color: rgba(0, 0, 0, 0.6);
			padding: 0 5px;
		}
        svg{
            margin-left: 5px;
        }
	}
`;


const PostButton = styled.button`
	min-width: 60px;
	padding-left: 20px;
    padding-right: 16px;
	border-radius: 20px;
	background: ${(props) => (props.disabled ? "rgba(0,0,0,0.8)" : "#0a66c2")};
	color:  ${(props) => (props.disabled ? "#5a5a5a" : "#fff")};
	font-size: 16px;
	letter-spacing: 1.1px;
	border: none;
	outline: none;
	&:hover {
		background: ${(props) => (props.disabled ? "#b8b8b8" : "#004182")} ;
	}
`;


const Editor = styled.div`
	padding: 12px 24px;
	textarea {
		width: 100%;
		min-height: 100px;
		resize: none;
	}
	input {
		width: 100%;
		height: 35px;
		font-size: 16px;
		margin-bottom: 20px;
	}
`;



const UploadImage = styled.div`
	text-align: center;
	img {
		width: 100%;
	}
`;


const mapStateToProps = (state) =>{
    return {
        user : state.userState.user,

    };

};

 const mapDispatchToProps = (dispatch) =>({

    postArticle : (payload) => dispatch(postArticleAPI(payload)),



 });

 
export default connect(mapStateToProps, mapDispatchToProps)(PostModal);