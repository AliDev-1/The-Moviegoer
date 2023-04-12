import React from "react";
import styled from "styled-components";
import ReactStars from "react-stars";
import moment from "moment";

const ReviewCard = ({ review }) => {
  //Checking if image is a Gravatar or TMDB image
    const isGravatar = review.author_details.avatar_path && review.author_details.avatar_path.includes("gravatar.com/avatar");
    let gravatarImage = "";
    if (isGravatar) {
      gravatarImage = review.author_details.avatar_path.slice(1, review.author_details.avatar_path.length - 1);
    }

  return (
    <Container>
      <Card>
        <UserDetailsDiv>
          <Avatar src={isGravatar ? gravatarImage : `https://image.tmdb.org/t/p/w500/${review.author_details.avatar_path}`} alt="Avatar" />
          <div>
                      <h5>{review.author}</h5>
                      
          </div>
        </UserDetailsDiv>
        <StarsDiv>
                  {review.author_details.rating}/10
                  <ReactStars count={10} value={review.author_details.rating} size={16} color2={"#ffd700"} />
        </StarsDiv>
        <Content>{review.content}</Content>
        <ReviewTime> Reviewd on: {moment(review.created_at).format("dddd, MMMM Do YYYY, h:mm:ss a")}</ReviewTime>
      </Card>
    </Container>
  );
};

const Container = styled.div``;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  color: white;
  height: 600px;
  width: 600px;
  gap: 10px;
  border: 1px solid rgba(181, 149, 117);
  background-color: #202125;
  border-radius:30px;
  padding: 20px;
`;
const UserDetailsDiv = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  margin-right: 10px;
`;
const Content = styled.div`
  font-size: 18px;
  text-align: justify;
  overflow: hidden; ;
`;

const StarsDiv = styled.div`
margin-top: 0px;
`;

const ReviewTime = styled.div`
  margin-top: 20px;
  font-size: 16px;
`;
export default ReviewCard;
