import React, {useState, useEffect} from 'react'

function Chat({socket, room, username}) {
    
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const Sending = async () => {
        if(message !== '')
        {
          const messa = {
            room: room,
            author: username,
            message: message,
            time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes() + ':' + new Date(Date.now()).getSeconds(),
          };
          await socket.emit("send_message", messa);
          setMessages(list => [...list, messa]);
          setMessage("");
        }
        document.getElementById('mess').value = '';
      }

      useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessages(list => [...list, data]);
        })
        
      }, [socket])

  return (
    <div>
    <div className="Chat">
        {
            messages.map((elem, i) => {
                if(i>0 && messages[i] != messages[i-1] || i == 0)
                    return (
                      <div key={i} className={elem.author === username ? 'Send' : 'Receive'}>
                        <p className='Timer'>{elem.time}</p>
                        <p className='Message'>{elem.message}</p>
                        <p className='Author'>Author: {elem.author}</p>
                      </div>
                    );
          })}
      </div>
      <div className='messInfo'>
        <input placeholder='Message' id="mess" onChange={(e) => setMessage(e.target.value)} onKeyUp={(e) => {if(e.key == "Enter") Sending()}}/>
        <button onClick={Sending} >Send message</button>
      </div>
      
      </div>
  )
}

export default Chat