
const MODULUS = 2 ** 31 - 1;
const A = 16807;
const C = 0;

class lcg {
    seed: number = Date.now() % MODULUS;
    a: number = A; // multiplier
    c: number = C; // increment
    modulus: number = MODULUS;
    precision: number = 3;

    constructor(
        _precision?: number,
        _seed?: number,
        _a?: number,
        _c?: number,
        _modulus?: number
    ) {
        this.precision = typeof _precision === 'number' ? _precision : this.precision;
        this.seed = typeof _seed === 'number' ? _seed : this.seed;
        this.a = typeof _a === 'number' ? _a : this.a;
        this.c = typeof _c === 'number' ? _c : this.c;
        this.modulus = typeof _modulus === 'number' ? _modulus : this.modulus;
        validate_state(this.seed, this.a, this.c, this.modulus);
    }

    random(min: number = 0, max: number = 1, precision: number = this.precision): number {
        validate(min, max, precision);
        if (max <= min || precision < 0) throw new Error("Max must be more than min / precision >= 0");
        this.nextSeed();
        const ma = max * (10 ** precision);
        const mi = min * (10 ** precision);
        const b = (ma + 1 - mi);
        const res = (min + ((b + (this.seed % b)) % b) / 10 ** precision).toFixed(precision);
        return precision === 0 ? parseInt(res) : parseFloat(res);
    }

    nextSeed(): void {
        this.seed = ((this.a * this.seed) + this.c) % this.modulus;
    }

    setPrecision(p: number): void {
        this.precision = p;
    }
}

export = lcg;

const validate = (...args: any[]): void => {
    for (let arg of args) {
        if (isNaN(arg)) {
            throw new Error("All parameters must be numbers.");
        }
    }
}

const validate_state = (
    _seed: number,
    _a: number,
    _c: number,
    _modulus: number
): void => {
    if (_modulus < 0) throw new Error("Modulus must be > 0.");
    if (_a <= 0 || _a >= _modulus) throw new Error("_a must be > 0 and < _modulus.");
    if (_c < 0 || _c >= _modulus) throw new Error("_c must be >= 0 and < _modulus.");
    if (_seed < 0 || _seed > _modulus) throw new Error("_seed must be >= 0 and < _modulus.");
}