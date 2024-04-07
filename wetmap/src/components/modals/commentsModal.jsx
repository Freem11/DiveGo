import { useState, useContext, useEffect, useRef } from "react";
import { Container, Form, FormGroup, Label, Button } from "reactstrap";
import CommentListItem from "../commentListItem/commentListItem";
import CloseIcon from "@mui/icons-material/Close";
import bubbles from "../../images/bubbles.png";
import { UserProfileContext } from "../contexts/userProfileContext";
import { SelectedPictureContext } from "../contexts/selectedPictureContext";
import { CommentsModalContext } from "../contexts/commentsModalContext";
import {
  insertPhotoComment,
  grabPhotoCommentsByPicId,
} from "../../supabaseCalls/photoCommentSupabaseCalls";
import "./commentsModal.css";

const CommentsModal = (props) => {
  const { animateCommentsModal } = props;
  const { profile } = useContext(UserProfileContext);
  const { selectedPicture } = useContext(SelectedPictureContext);
  const { commentsModal, setCommentsModal } = useContext(CommentsModalContext);
  const [commentContent, setCommentContent] = useState(null);
  const [listOfComments, setListOfComments] = useState(null);
  const [replyTo, setReplyTo] = useState(null);
  const [selectedReplyId, setSelectedReplyId] = useState([]);

  const handleCommentModalClose = async () => {
    setReplyTo(null);
    setCommentsModal(false);
    animateCommentsModal();
  };
  useEffect(() => {
    if (selectedPicture) {
      getAllPictureComments(selectedPicture.id);
    }
  }, [commentsModal]);

  const getAllPictureComments = async (picId) => {
    let picComments = await grabPhotoCommentsByPicId(picId);
    setListOfComments(picComments);
  };

  const hideRepliesForChildren = (parentId, newSelectedReplyId) => {
    newSelectedReplyId = [...newSelectedReplyId.filter((id) => parentId !== id)];
    for (const comment of listOfComments) {
      if (comment.replied_to === parentId) {
        newSelectedReplyId = hideRepliesForChildren(comment.id, newSelectedReplyId);  
      }
    }

    return newSelectedReplyId;
  }

  const toggleShowReplies = (comment) => {
    if (selectedReplyId.includes(comment.id)) {
      let selectedReplyIdTemp = hideRepliesForChildren(comment.id, selectedReplyId);
      setSelectedReplyId(selectedReplyIdTemp);
    } else {
      setSelectedReplyId([...selectedReplyId,comment.id]);
    }
  }

  const getCommentListView = (commentId, level = 0) => {
    let marginLeft = 5 * level;
    let width = 98 - marginLeft;
    const marginStyle = {
      commentLevelShift: {
        marginLeft: `${marginLeft}%`,
        width: `${width}%`,
      },
    };
    return (
      <div
        key={`parent-${commentId ? commentId : 0}`}
        className="commentListContainer"
        style={marginStyle.commentLevelShift}
      >
        {listOfComments &&
          listOfComments.map((commentDeets) => {
            if (commentDeets.replied_to === commentId) {
              let nbReplies = 0;
              for (let comment of listOfComments) {
                if (comment.replied_to === commentDeets.id) {
                  nbReplies++;
                }
              }
              return selectedReplyId.includes(commentDeets.replied_to) ||
                commentDeets.replied_to === null ? (
                <div key={commentDeets.id}>
                  <CommentListItem
                    commentDetails={commentDeets}
                    setReplyTo={setReplyTo}
                    replyTo={replyTo}
                    toggleShowReplies={toggleShowReplies}
                    selectedReplyId={selectedReplyId}
                    nbReplies={nbReplies}
                  />
                  {getCommentListView(commentDeets.id, level + 1)}
                </div>
              ) : null;
            }
          })}
      </div>
    );
  };

  return (
    <div className="masterDiv">
      <div className="titleDiv">
        <h3
          style={{
            marginLeft: "1vw",
            width: "100vw",
            textAlign: "left",
            fontFamily: "Patrick Hand",
            fontSize: "2.5vw",
            // backgroundColor: "pink"
          }}
        >
          Comments
        </h3>
        <FormGroup>
          <Button
            variant="text"
            id="closeButton"
            onClick={() => animateCommentsModal()}
            style={{
              display: "flex",
              flexDirection: "column",
              // marginRight: 20,
              // marginTop: 10,
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <CloseIcon
              sx={{ color: "lightgrey", width: "3vw", height: "5vh" }}
            ></CloseIcon>
          </Button>
        </FormGroup>
      </div>

            <div style={{height: "1vh", width: "100%"}}>
            {getCommentListView(null)}

            </div>
      
    </div>
  );
};

export default CommentsModal;
