const LOCALHOST_IP = "http://192.168.1.60"; //192.168.1.60 //10.39.200.236

let settings = {
  devRunMode: 100,
  withConsole: true,
};
let hostname = `${LOCALHOST_IP}:3001`;

// Utilisez export direct au lieu de module.exports
export { settings, hostname };