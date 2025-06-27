export const createRoom = async (name) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;

  const res = await fetch('http://localhost:5000/api/rooms/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ name })
  });

  if (!res.ok) {
    throw new Error('Failed to create room');
  }

  return res.json();
};

export const joinRoom = async (code) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;

  const res = await fetch(`http://localhost:5000/api/rooms/join/${code}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error('Failed to join room');
  }

  return res.json();
};

export const getMyRooms = async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user?.token;
  
  const res = await fetch('http://localhost:5000/api/rooms/my-rooms', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch rooms');
  }

  return res.json();
};
