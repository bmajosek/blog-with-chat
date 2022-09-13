const List = [];

const addUser = ({id, user, room}) =>{
    const isThere = List.findIndex(elem =>{
        return elem.id === id;
    })
    if(isThere === -1)
    {
        return List.push({id, user, room});
    }
    removeUser({id: id});
    List.push({id, user, room});
    return ({id, user, room});
}

const removeUser = ({id}) =>{
    const where = List.findIndex(elem =>{
        return elem.id === id;
    })
    if(where !== -1)
    {
        return List.splice(where,1);
    }
}

const getUsers = () =>{
    return List;
}

const getRoomers = (room) =>{
    return List.filter(elem => {return elem.room == room});
}

const existUser = (user) =>{
    const isThere = List.findIndex(elem =>{
        return elem.user === user.username && elem.id !== user.id;
    })
    return isThere;
}

module.exports = {addUser, removeUser, getUsers, existUser, getRoomers};