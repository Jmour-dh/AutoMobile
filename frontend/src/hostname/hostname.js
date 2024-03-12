const LOCALHOST_IP = "http://172.16.29.121"; //192.168.1.60 //10.39.200.236 //172.20.10.2 //172.16.17.29

let settings = {
  devRunMode: 100,
  withConsole: true,
};
let hostname = `${LOCALHOST_IP}:3001`;

// Utilisez export direct au lieu de module.exports
export { settings, hostname };
