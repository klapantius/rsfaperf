const buildPatterns = [
    '*Torus.Main.GC*',
    '*Cube.Main.GC*',
    '*Foundations.Main.*GC*',
    '*Core.Main.*GC*',
    '*DataStorage.Main.*GC*',
    '*Findings.Main.*GC*',
    '*HL7.Main.*GC*',
    '*Workflow.Main.*GC*',
    '*Dicom.Main.*GC*',
    '*LCO.Main.*GC*',
    '*Imaging.Main.*GC*',
    '*CIP.Main.*GC*',
    '*ITF.Main.*GC*',
    '*Organizer.Main.*GC*',
    '*Service.Main.*GC*',
    '*AiM.Main.*GC*',
];

const dropfolder = '\\\\build-sy.healthcare.siemens.com\\DropNative$\\';

const webuiPort = 3000;

const dbpath = '';

module.exports = { buildPatterns, dropfolder, webuiPort, dbpath };
