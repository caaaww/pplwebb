async function login() {

  const username =
    document.getElementById("username").value;

  const password =
    document.getElementById("password").value;

  const { data, error } = await supabaseClient
    .from("users")
    .select("*")
    .eq("username", username)
    .eq("password", password);

  console.log(data);
  console.log(error);

  if(data && data.length > 0){

    alert("Login berhasil");

    localStorage.setItem("login", "true");

    window.location.href = "dashboard.html";

  }else{

    alert("Login gagal");

  }
}