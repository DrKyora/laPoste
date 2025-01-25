class Client {
  constructor(nom, serviceDemande, handicape = false, senior = false) {
    this.nom = nom;
    this.serviceDemande = serviceDemande;
    this.handicape = handicape;
    this.senior = senior;
  }
}
