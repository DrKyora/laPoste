const filePostale = new FilePostale();

document.getElementById("clientForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const nom = document.getElementById("nomClient").value;
  const serviceDemande = document.getElementById("serviceDemande").value;
  const handicape = document.getElementById("handicape").checked;
  const senior = document.getElementById("senior").checked;

  const nouveauClient = new Client(nom, serviceDemande, handicape, senior);
  filePostale.ajouterClient(nouveauClient);

  // Réinitialiser le formulaire
  e.target.reset();
});

document.getElementById("servirClient").addEventListener("click", () => {
  filePostale.servirClient();
});
