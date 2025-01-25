class FilePostale {
  constructor() {
    this.clients = [];
    this.historique = [];
  }

  ajouterClient(client) {
    client.dateArrivee = new Date();
    this.clients.push(client);
    this.clients.sort((a, b) => {
      if (a.handicape || a.senior) {
        if (b.handicape || b.senior) {
          return 0; // si les deux clients sont prioritaires, ils gardent leur ordre d'arrivée
        } else {
          return -1; // si a est prioritaire et b non, a passe devant b
        }
      } else {
        if (b.handicape || b.senior) {
          return 1; // si a n'est pas prioritaire et b oui, b passe devant a
        } else {
          return 0; // si les deux clients ne sont pas prioritaires, ils gardent leur ordre d'arrivée
        }
      }
    });
    this.afficherFile();
  }

  servirClient() {
    if (this.clients.length === 0) {
      alert("Aucun client dans la file d'attente");
      return;
    }

    const clientServi = this.clients.shift();
    if (!clientServi) {
      console.log("Erreur : clientServi est undefined");
      return;
    }

    const dateDepart = new Date(); // enregistre la date de départ du client
    const tempsAttente = clientServi.dateArrivee
      ? (dateDepart - clientServi.dateArrivee) / 1000
      : 0; // calcule le temps d'attente en secondes
    const tempsAttenteEnMinutes = Math.round(tempsAttente / 60); // convertit le temps d'attente en minutes et arrondit à l'entier le plus proche

    const categories = [];
    if (clientServi.handicape) {
      categories.push("Handicapé");
    }
    if (clientServi.senior) {
      categories.push("Senior");
    }

    const categoriesText = categories.length > 0 ? ` (${categories.join(", ")})` : "";

    // Ajoute le client à l'historique
    this.historique.push({
      nom: clientServi.nom,
      service: clientServi.serviceDemande,
      handicape: clientServi.handicape,
      senior: clientServi.senior,
      tempsAttente: tempsAttenteEnMinutes,
    });

    // Met à jour le tableau de l'historique
    this.afficherHistorique();

    this.afficherFile();
  }

  afficherFile() {
    const fileElement = document.getElementById("listeClients");
    fileElement.innerHTML = "";

    this.clients.forEach((client, index) => {
      const clientElement = document.createElement("tr");
      clientElement.innerHTML = `
              <td>${client.nom}</td>
              <td>${client.serviceDemande}</td>
              <td>${client.handicape ? "Oui" : "Non"}</td>
              <td>${client.senior ? "Oui" : "Non"}</td>
            `;
      fileElement.appendChild(clientElement);
    });
  }

  afficherHistorique() {
    const historiqueElement = document.getElementById("listeHistorique");
    historiqueElement.innerHTML = "";

    this.historique.forEach((client) => {
      const clientElement = document.createElement("tr");
      clientElement.innerHTML = `
              <td>${client.nom}</td>
              <td>${client.service}</td>
              <td>${client.handicape ? "Oui" : "Non"}</td>
              <td>${client.senior ? "Oui" : "Non"}</td>
              <td>${client.tempsAttente} minute(s)</td>
            `;
      historiqueElement.appendChild(clientElement);
    });
  }
}
