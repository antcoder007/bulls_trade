import React, { useEffect, useState } from "react";
import AuthService from "../../services/auth.service";

function Profile(props) {
    const [user, setUser] = useState({});

    useEffect(() => {
        const test = AuthService.getCurrentUser();
        test.then(function(result) {
            console.log(result);
            setUser(result);
        });
    }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>Welcome {user['username']}!</strong>
        </h3>
      </header>
      <p>
        <strong>Email: </strong>{user.email}
      </p>
    </div>
  );
};

export default Profile;