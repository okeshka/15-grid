export default function checkFriend(friend, order) {
    friend = friend - order;           
    let condition = false;
    if (order%4 === 0) {
        condition = (friend == 4) || (friend == 1) || (friend == -4)   
    }
    else if((order + 1)%4 == 0) {
        condition = (friend == 4) || (friend == -1) || (friend == -4)   
    }
    else {
        condition = (friend == 4) || (friend == 1) || (friend == -4) || (friend == -1);  
    }
    return condition
};