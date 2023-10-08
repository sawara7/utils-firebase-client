"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFutures = exports.loginFirebase = exports.initializeFirebase = void 0;
const firebase_1 = __importDefault(require("firebase"));
require("firebase/auth");
const firebase_utils_common_1 = require("firebase-utils-common");
function initializeFirebase(callback) {
    fetch('/__/firebase/init.json').then((response) => __awaiter(this, void 0, void 0, function* () {
        if (yield firebase_1.default.initializeApp(yield response.json())) {
            firebase_1.default.auth().onAuthStateChanged(user => {
                const initialized = user instanceof Object;
                callback(initialized);
            });
        }
    }));
}
exports.initializeFirebase = initializeFirebase;
function loginFirebase() {
    if (!firebase_1.default.auth().currentUser) {
        firebase_1.default.auth().signInWithRedirect(new firebase_1.default.auth.GoogleAuthProvider());
    }
}
exports.loginFirebase = loginFirebase;
function getFutures(cb) {
    firebase_1.default.database()
        .ref((0, firebase_utils_common_1.getFuturePath)(Date.now()))
        .on("value", (snapshot) => {
        const res = snapshot.val();
        cb(res);
    });
}
exports.getFutures = getFutures;
