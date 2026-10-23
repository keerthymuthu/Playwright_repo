import { expect,test } from "@playwright/test";
import fs from "fs";
import path from "path";

const dir = path.resolve(process.cwd(),`testData/API`)
const inputFile = fs.readFileSync(path.join(dir, 'Create_incident.json'),`utf-8`);
const jsonFile = JSON.parse(inputFile);
console.log(`Input sys_id: ${jsonFile.sys_id}`);
jsonFile.approval = `Approved`;
fs.writeFileSync(path.resolve(`testData/API/Create_incident.json`),JSON.stringify(jsonFile));
const updatedFile = fs.readFileSync(path.resolve(`testData/API/Create_incident.json`),`utf-8`);
test(`API Test`,async({request})=>{
    const response = await request.post(`https://dev223042.service-now.com/api/now/table/incident`,
        {
            params: {
                "sysparm_fields": "sys_id"
            },
            headers:{
                "Authorization": "Basic YWRtaW46R2NDOHg9WWpkXkw5",
                "Content-Type": "application/json"
            },
             data: {
                updatedFile
                //"short_description": "Created using Playwright API"
            }
        }
    )

    const responseBody = await response.json();
    console.log(updatedFile);
    console.log(responseBody.result.sys_id);
    console.log(response.status());
    expect(response.status()).toBe(201);
});