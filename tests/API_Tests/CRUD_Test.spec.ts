import { expect,test } from "@playwright/test";

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
                "short_description": "Created using Playwright API"
            }
        }
    )

    const responseBody = await response.json();
    console.log(responseBody.result.sys_id);
});