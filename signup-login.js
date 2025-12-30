
document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault(); // page reload rokne ke liye

    const signupData = {
        name: document.getElementById("signupName").value,
        email: document.getElementById("signupEmail").value,
        password: document.getElementById("signupPassword").value,
        mobile: document.getElementById("signupMobile").value,
        gender: document.getElementById("signupGender").value
    };

    console.log("Signup Data 👉", signupData);

    fetch("https://divine-sarthi.vercel.app/users/register", {   // 🔴 backend URL yaha change karna
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(signupData)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Server Response 👉", data);

        if (data.success) {
            alert("Signup successful ✅");
            document.getElementById("signupForm").reset();
        } else {
            alert(data.message || "Signup failed ❌");
        }
    })
    .catch(error => {
        console.error("Error 👉", error);
        alert("Something went wrong ❌");
    });
});

// login js 
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const loginData = {
        email: document.getElementById("loginEmail").value,
        password: document.getElementById("loginPassword").value,
        rememberMe: document.getElementById("rememberMe").checked
    };

    console.log("Login Data 👉", loginData);

    fetch("http://localhost:5000/api/login", {   // 🔴 backend URL yaha check karna
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
    })
    .then(res => res.json())
    .then(data => {
        console.log("Server Response 👉", data);

        if (data.success) {
            alert("Login successful ✅");

            // 🔐 Token save (optional)
            if (data.token) {
                localStorage.setItem("token", data.token);
            }

            document.getElementById("loginForm").reset();
        } else {
            alert(data.message || "Invalid email or password ❌");
        }
    })
    .catch(err => {
        console.error("Login Error 👉", err);
        alert("Server not responding ❌");
    });
});