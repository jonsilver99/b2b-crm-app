import { HttpErrorResponse, HttpResponse } from "@angular/common/http";

export class ClientNotifications {


    static NotifySuccess(response: HttpResponse<any> | string | any) {
        // If there's a custome success message - Extract text/string and alert
        if (Object.keys(response).length > 0) {
            if ("successMsg" in response || "body" in response) {
                let successMsg = response.successMsg || response.body.successMsg;
                if (successMsg) {
                    setTimeout(() => {
                        alert(successMsg);
                    }, 500)
                    if (response.status != 200) {
                        console.log('response status is not 200 - investigate:', response)
                    }
                }
            }
        }
        return
    }

    static NotifyError(error: HttpErrorResponse | string | any) {
        // Extract text/string message
        let message;
        if (Object.keys(error).length > 0) {

            let invalidInput = error.error.invalidInput;
            if (invalidInput) {
                message = 'Invalid inputs:\n';
                for (let key in invalidInput) {
                    message += key + ' ' + invalidInput[key].join() + '\n';
                }
            } else {
                message = error.error || error.message || 'Error: (no error response message found) - check console'
            }
        }
        if (typeof error == "string") {
            message = error;
        }
        setTimeout(() => {
            alert(message);
        }, 500)
    }
}