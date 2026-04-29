async function login() {

  const username =
    document.getElementById("username").value;

  const password =
    document.getElementById("password").value;

  const { data } = await supabaseClient
    .from("users")
    .select("*")
    .eq("username", username)
    .eq("password", password);

  if (data.length > 0) {

    localStorage.setItem("login", "true");

    window.location.href = "dashboard.html";

  } else {

    alert("Login gagal");

  }
}