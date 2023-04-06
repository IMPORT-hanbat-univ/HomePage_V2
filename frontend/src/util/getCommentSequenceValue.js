export default function getCommentSequenceValue(comments, group) {
    if(!comments||comments.length === 0){
        return null;
    }
    const groupList = comments.filter((comment) => comment.group === group && comment.sequence !== null);
    if(groupList&&groupList.length > 0){
        return groupList.reduce((highestSequence, comment) => {
            return comment.sequence > highestSequence ? comment.sequence : highestSequence
        }, -1) + 1;
    }else{
        return 0;
    }
   
}