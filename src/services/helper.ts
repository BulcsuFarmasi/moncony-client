export class HelperService {

    cloneArray (array:any[]) {
        return JSON.parse(JSON.stringify(array));
    }

}