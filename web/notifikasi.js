if (!localStorage.getItem("login")) {
  window.location.href = "index.html";
}

async function getNotif() {
  const { data } = await supabaseClient
    .from("notifikasi")
    .select("*")
    .order("notifikasi_id", { ascending: false });

  let html = "";
  data.forEach(item => {
    html += `
    <div class="card">
      <h3>${item.pesan}</h3>
      <p>${item.waktu}</p>
    </div>`;
  });

  document.getElementById("notifBox").innerHTML = html;
}

function logout() {
  localStorage.removeItem("login");
  window.location.href = "index.html";
}

getNotif();
