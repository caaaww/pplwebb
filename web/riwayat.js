if (!localStorage.getItem("login")) {
  window.location.href = "index.html";
}

async function getRiwayat() {
  const { data } = await supabaseClient
    .from("riwayat_pakan")
    .select("*")
    .order("riwayat_id", { ascending: false });

  let rows = "";
  data.forEach(item => {
    const statusClass = item.status_eksekusi === "Berhasil" ? "badge-success"
      : item.status_eksekusi === "Gagal" ? "badge-danger" : "badge-warning";

    rows += `
    <tr>
      <td>${item.waktu_eksekusi}</td>
      <td>${item.jumlah_pakan} g</td>
      <td><span class="badge ${statusClass}">${item.status_eksekusi}</span></td>
    </tr>`;
  });

  document.getElementById("riwayatBody").innerHTML = rows;
}

function logout() {
  localStorage.removeItem("login");
  window.location.href = "index.html";
}

getRiwayat();
