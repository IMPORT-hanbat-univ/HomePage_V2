export default function getCommentSequenceValue(comments, group) {
    console.log(comments)
    if(!comments||comments.length === 0){
        return null;
    }
    const groupList = comments.filter((comment) => comment.group === group);
    if(groupList&&groupList.length > 0){
        return groupList.reduce((highestSequence, comment) => {
            return comment.sequence > highestSequence ? comment.sequence : highestSequence
        }, -1) + 1;
    }else{
        return 0;
    }
   
}