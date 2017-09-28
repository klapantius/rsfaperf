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

var buildPatterns2 = [
    {name: 'Torus', pattern: '*Torus.Main.GC*'},
    {name: 'Cube', pattern: '*Cube.Main.GC*'},
    {name: 'Foundations', pattern: '*Foundations.Main.*GC*'},
    {name: 'Core', pattern: '*Core.Main.*GC*'},
    {name: 'DataStorage', pattern: '*DataStorage.Main.*GC*'},
    {name: 'Findings', pattern: '*Findings.Main.*GC*'},
    {name: 'HL7', pattern: '*HL7.Main.*GC*'},
    {name: 'Workflow', pattern: '*Workflow.Main.*GC*'},
    {name: 'Dicom', pattern: '*Dicom.Main.*GC*'},
    {name: 'LCO', pattern: '*LCO.Main.*GC*'},
    {name: 'Imaging', pattern: '*Imaging.Main.*GC*'},
    {name: 'CIP', pattern: '*CIP.Main.*GC*'},
    {name: 'ITF', pattern: '*ITF.Main.*GC*'},
    {name: 'Organizer', pattern: '*Organizer.Main.*GC*'},
    {name: 'Service', pattern: '*Service.Main.*GC*'},
    {name: 'AiM', pattern: '*AiM.Main.*GC*'},
];

const dbfolder='x:\\juba';

const dropfolder = '\\\\build-sy.healthcare.siemens.com\\DropNative$\\';

const webuiPort = 3000;

const dbpath = '\\\\erlh1fea\\collaboration$\\juba\\rsfaperf.db';

module.exports = { buildPatterns, dropfolder, webuiPort, dbpath, dbfolder, buildPatterns2 };
