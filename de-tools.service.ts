import {Injectable} from '@angular/core';

@Injectable()
export class DeToolsService {

    constructor() {
    }

    objectToArray(object: any, nameForKey?: string): any[] {
        nameForKey = nameForKey || 'key';

        return Object.keys(object).map((key) => {
            let element = object[key];

            element[nameForKey] = key;
            return element;
        });
    }

    makeId(randomStringLength: number, ...strings: string[]): string {
        let ret = '';

        strings.map((string) => {
            if (ret && string) {
                ret = ret.concat('-');
            }
            ret = ret.concat(this.removeAccents(string));
        });
        if (randomStringLength) {
            ret = ret.concat('-').concat(this.randomString(randomStringLength));
        }
        ret = ret.replace(/[#$[\].]/g, '-'); // Firebase keys can't contain
        return encodeURIComponent(ret);
    }

    randomString(length: number) {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = '';

        for (let i = 0; i < length; i++) {
            randomString += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return randomString;
    }

    removeAccents(str: string): string {
        const accent = [
            /[\300-\306]/g, /[\340-\346]/g, // A, a
            /[\310-\313]/g, /[\350-\353]/g, // E, e
            /[\314-\317]/g, /[\354-\357]/g, // I, i
            /[\322-\330]/g, /[\362-\370]/g, // O, o
            /[\331-\334]/g, /[\371-\374]/g, // U, u
            /[\321]/g, /[\361]/g, // N, n
            /[\307]/g, /[\347]/g, // C, c
        ];
        const noAccent = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'N', 'n', 'C', 'c'];

        for (let i = 0; i < accent.length; i++) {
            str = str.replace(accent[i], noAccent[i]);
        }
        str = str.trim().replace(/[\/\\\s]/g, '-');
        str = str.replace(/--+/g, '-');
        return str;
    }

    deleteUndefined(elem: any) {
        if (elem instanceof Array) {
            elem.map((value, i) => {
                if (value instanceof Object || value instanceof Array) {
                    this.deleteUndefined(value);
                } else if (!value && value !== false) {
                    delete elem[i];
                }
            });
        } else if (elem instanceof Object && !(elem instanceof File)) {
            Object.keys(elem).map((key) => {
                if (elem[key] instanceof Object || elem[key] instanceof Array) {
                    this.deleteUndefined(elem[key]);
                } else if (!elem[key] && elem[key] !== false) {
                    delete elem[key];
                }
            });
        }
    }

}


