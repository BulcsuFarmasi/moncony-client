export class HelperService {

    copy (value:any) {
        return JSON.parse(JSON.stringify(value));
    }

}