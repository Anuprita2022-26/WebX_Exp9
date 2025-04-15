document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value.trim();
    const college = document.getElementById('college').value.trim();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const messageBox = document.getElementById('message');
    const addNewBtn = document.getElementById('addNewBtn');
  
    // Clear previous error messages
    messageBox.innerText = '';
    messageBox.style.color = 'red';
    addNewBtn.style.display = 'none';
  
    if (!name) {
      messageBox.innerText = 'Name cannot be empty!';
      return;
    }
  
    if (password !== confirmPassword) {
      messageBox.innerText = 'Passwords do not match!';
      return;
    }
  
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/users', true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        const users = JSON.parse(xhr.responseText);
        const userExists = users.some(user => user.username === username);
  
        if (userExists) {
          messageBox.innerText = 'Username already exists!';
        } else {
          const newUser = {
            name,
            college,
            username,
            password
          };
  
          const xhrPost = new XMLHttpRequest();
          xhrPost.open('POST', 'http://localhost:3000/users', true);
          xhrPost.setRequestHeader('Content-Type', 'application/json');
          xhrPost.onload = function () {
            if (xhrPost.status === 201) {
              messageBox.innerText = '✅ Successfully Registered!';
              messageBox.style.color = 'green';
              addNewBtn.style.display = 'inline-block';
  
              // Disable the form after success
              document.querySelectorAll('#registerForm input, #registerForm button[type="submit"]').forEach(el => {
                el.disabled = true;
              });
            } else {
              messageBox.innerText = 'Something went wrong!';
            }
          };
          xhrPost.send(JSON.stringify(newUser));
        }
      }
    };
    xhr.send();
  });
  
  // Reset form on clicking "Add New"
  document.getElementById('addNewBtn').addEventListener('click', function () {
    document.getElementById('registerForm').reset();
    document.getElementById('message').innerText = '';
    this.style.display = 'none';
  
    // Enable form again
    document.querySelectorAll('#registerForm input, #registerForm button[type="submit"]').forEach(el => {
      el.disabled = false;
    });
  });
  