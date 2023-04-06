export default function getCommentGroupValue(comments){
    if(!comments||comments.length === 0){
        return 0;
    }
   
    return comments.reduce((highestGroup, comment) => {
        return comment.group > highestGroup ? comment.group : highestGroup;
      }, -1) + 1;
    
  
}