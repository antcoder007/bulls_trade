import axios from "axios";

// const API_URL = "http://localhost:3001";

const register = (username, email, password, address) => {
  return axios.post("user/signup", {
    username,
    email,
    password,
    address
  })
};

const login = (email, password) => {
  return axios
    .post("user/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  const obj = JSON.parse(localStorage.getItem("user"));
  return axios.get("user/me", {
    headers: {
      'token' : obj.token
    }
  })
  .then((response) => {
    return response.data;
  });
};

const getProducts = () => {
  return axios.get("product/")
  .then((response) => {
    return response.data;
  })
}

const getMyPrdocuts = () => {
  const obj = JSON.parse(localStorage.getItem("user"));
  return axios.get("user/product", {
    headers: {
      'token' : obj.token
    }
  })
  .then((response) => {
    return response.data;
  });
}

const getWishList = () => {
  const obj = JSON.parse(localStorage.getItem("user"));
  return axios.get("user/watch", {
    headers: {
      'token' : obj.token
    }
  })
  .then((response) => {
    return response.data;
  });
}

const createProduct = (productName, productDescription, price, image) => {
  const obj = JSON.parse(localStorage.getItem("user"));
  const data = {
      productName,
      productDescription, 
      price, 
      image
  }
  return axios.post("product/", data, {
    headers: {
      'token': obj.token
    },    
  })
  .then((response) => {
    return response.data;
  })
}

// const createWishProduct = () => {
//   const obj = JSON.parse(localStorage.getItem("user"));
//   return axios.post("product/", {
//     headers: {
//       'token': obj.token

//     },    
//   })
//   .then((response) => {
//     return response.data;
//   })
// }

export default {
  register,
  login,
  logout,
  getCurrentUser,
  getProducts,
  getMyPrdocuts,
  getWishList,
  createProduct
};