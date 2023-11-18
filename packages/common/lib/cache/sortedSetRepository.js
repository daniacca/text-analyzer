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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortedSetRepository = void 0;
class SortedSetRepository {
    constructor(client, setKey) {
        this.client = client;
        this.setKey = setKey;
    }
    add(...toBeAdded) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.zAdd(this.setKey, toBeAdded);
        });
    }
    increment(value, increment = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.zIncrBy(this.setKey, increment, value);
        });
    }
    decrement(value, decrement = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.zIncrBy(this.setKey, -decrement, value);
        });
    }
    remove(value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.zRem(this.setKey, value);
        });
    }
    score(value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.zScore(this.setKey, value);
        });
    }
    count() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.zCard(this.setKey);
        });
    }
    range(start, stop) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.zRange(this.setKey, start, stop);
        });
    }
}
exports.SortedSetRepository = SortedSetRepository;
//# sourceMappingURL=sortedSetRepository.js.map