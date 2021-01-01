/// <reference path="../lib/typings/backbone/backbone.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Models;
(function (Models) {
    var HindiLetter = (function (_super) {
        __extends(HindiLetter, _super);
        function HindiLetter(attributes, options) {
            _super.call(this);
        }
        HindiLetter.prototype.defaults = function () {
            return {
                letter: "", readable: ""
            };
        };
        return HindiLetter;
    })(Backbone.Model);
    Models.HindiLetter = HindiLetter;
})(Models || (Models = {}));
/// <reference path="../lib/typings/jquery/jquery.d.ts" />
/// <reference path="../lib/typings/underscore/underscore.d.ts" />
/// <reference path="../lib/typings/backbone/backbone.d.ts" />
/// <reference path="./HindiLetter.ts/" />
var Match = (function () {
    function Match() {
    }
    return Match;
})();

var HindiProcessor = (function (_super) {
    __extends(HindiProcessor, _super);
    function HindiProcessor() {
        _super.call(this);
        this.readableToHindiLetters = {};
        this.readableToSecondaryHindiLetters = {};
        this.secondaryLetters = {
            "्": "",
            "ा": "aa",
            "ि": "i",
            "ी": "ee",
            "ु": "u",
            "ू": "oo",
            "ऋ": "ri",
            "ॠ": "rī",
            "ऌ": "li",
            "ॡ": "lī",
            "ृ": "ru",
            "ॄ": "",
            "ॣ": "",
            //"ॡ": "",
            "े": "ae",
            "ै": "ai",
            "ो": "o",
            "ौ": "au",
            "॑": "",
            "॒": "",
            "॓": "",
            "॔": "",
            "ँ": "N",
            "ं": "n",
            "ः": "ha",
            "़": ""
        };
        this.readableLetters = {
            "अ": "a",
            "आ": "aa",
            "इ": "i",
            "ई": "ee",
            "उ": "u",
            "ऊ": "oo",
            "ए": "ae",
            "ऐ": "ai",
            "ओ": "o",
            "औ": "au",
            "अं": "am",
            "आः": "aha",
            "।": ". ",
            "॥": "",
            "ऽ": "",
            "॰": "",
            "ॐ": "om"
        };
        this.consanants = {
            "क": [{ letter: "क", readable: "ka" }, { letter: "का", readable: "kaa" }, { letter: "कि", readable: "ki" }, { letter: "की", readable: "kee" }, { letter: "कु", readable: "ku" }, { letter: "कू", readable: "koo" }, { letter: "कृ", readable: "kru" }, { letter: "के", readable: "ke" }, { letter: "कै", readable: "kai" }, { letter: "को", readable: "ko" }, { letter: "कौ", readable: "kau" }, { letter: "कं", readable: "kam" }, { letter: "कः", readable: "kah" }],
            "ख": [{ letter: "ख", readable: "kha" }, { letter: "खा", readable: "khaa" }, { letter: "खि", readable: "khi" }, { letter: "खी", readable: "khee" }, { letter: "खु", readable: "khu" }, { letter: "खू", readable: "khoo" }, { letter: "खृ", readable: "khru" }, { letter: "खे", readable: "khe" }, { letter: "खै", readable: "khai" }, { letter: "खो", readable: "kho" }, { letter: "खौ", readable: "khau" }, { letter: "खं", readable: "kham" }, { letter: "खः", readable: "khah" }],
            "ग": [{ letter: "ग", readable: "ga" }, { letter: "गा", readable: "gaa" }, { letter: "गि", readable: "gi" }, { letter: "गी", readable: "gee" }, { letter: "गु", readable: "gu" }, { letter: "गू", readable: "goo" }, { letter: "गृ", readable: "gru" }, { letter: "गे", readable: "ge" }, { letter: "गै", readable: "gai" }, { letter: "गो", readable: "go" }, { letter: "गौ", readable: "gau" }, { letter: "गं", readable: "gam" }, { letter: "गः", readable: "gah" }],
            "घ": [{ letter: "घ", readable: "gha" }, { letter: "घा", readable: "ghaa" }, { letter: "घि", readable: "ghi" }, { letter: "घी", readable: "ghee" }, { letter: "घु", readable: "ghu" }, { letter: "घू", readable: "ghoo" }, { letter: "घृ", readable: "ghru" }, { letter: "घे", readable: "ghe" }, { letter: "घै", readable: "ghai" }, { letter: "घो", readable: "gho" }, { letter: "घौ", readable: "ghau" }, { letter: "घं", readable: "gham" }, { letter: "घः", readable: "ghah" }],
            "ङ": [{ letter: "ङ", readable: "nga" }, { letter: "ङा", readable: "ngaa" }, { letter: "ङि", readable: "ngi" }, { letter: "ङी", readable: "ngee" }, { letter: "ङु", readable: "ngu" }, { letter: "ङू", readable: "ngoo" }, { letter: "ङ्रु", readable: "ngru" }, { letter: "ङे", readable: "nge" }, { letter: "ङै", readable: "ngai" }, { letter: "ङो", readable: "ngo" }, { letter: "ङौ", readable: "ngau" }, { letter: "ङं", readable: "ngam" }, { letter: "ङः", readable: "ngah" }],
            "च": [{ letter: "च", readable: "ca" }, { letter: "चा", readable: "caa" }, { letter: "चि", readable: "ci" }, { letter: "ची", readable: "cee" }, { letter: "चु", readable: "cu" }, { letter: "चू", readable: "coo" }, { letter: "चृ", readable: "cru" }, { letter: "चे", readable: "ce" }, { letter: "चै", readable: "cai" }, { letter: "चो", readable: "co" }, { letter: "चौ", readable: "cau" }, { letter: "चं", readable: "cam" }, { letter: "चः", readable: "cah" }],
            "छ": [{ letter: "छ", readable: "cha" }, { letter: "छा", readable: "chaa" }, { letter: "छि", readable: "chi" }, { letter: "छी", readable: "chee" }, { letter: "छु", readable: "chu" }, { letter: "छू", readable: "choo" }, { letter: "छृ", readable: "chru" }, { letter: "छे", readable: "che" }, { letter: "छै", readable: "chai" }, { letter: "छो", readable: "cho" }, { letter: "छौ", readable: "chau" }, { letter: "छं", readable: "cham" }, { letter: "छः", readable: "chah" }],
            "ज": [{ letter: "ज", readable: "ja" }, { letter: "जा", readable: "jaa" }, { letter: "जि", readable: "ji" }, { letter: "जी", readable: "jee" }, { letter: "जु", readable: "ju" }, { letter: "जू", readable: "joo" }, { letter: "जृ", readable: "jru" }, { letter: "जे", readable: "je" }, { letter: "जै", readable: "jai" }, { letter: "जो", readable: "jo" }, { letter: "जौ", readable: "jau" }, { letter: "जं", readable: "jam" }, { letter: "जः", readable: "jah" }],
            "झ": [{ letter: "झ", readable: "jha" }, { letter: "झा", readable: "jhaa" }, { letter: "झि", readable: "jhi" }, { letter: "झी", readable: "jhee" }, { letter: "झु", readable: "jhu" }, { letter: "झू", readable: "jhoo" }, { letter: "झृ", readable: "jhru" }, { letter: "झे", readable: "jhe" }, { letter: "झै", readable: "jhai" }, { letter: "झो", readable: "jho" }, { letter: "झौ", readable: "jhau" }, { letter: "झं", readable: "jham" }, { letter: "झः", readable: "jhah" }],
            "ञ": [{ letter: "ञ", readable: "ña" }, { letter: "ञा", readable: "ñaa" }, { letter: "ञि", readable: "ñi" }, { letter: "ञी", readable: "ñee" }, { letter: "ञु", readable: "ñu" }, { letter: "ञू", readable: "ñoo" }, { letter: "ञृ", readable: "ñru" }, { letter: "ञॆ", readable: "ñe" }, { letter: "ञै", readable: "ñai" }, { letter: "ञो", readable: "ño" }, { letter: "ञौ", readable: "ñau" }, { letter: "ञं", readable: "ñam" }, { letter: "ञः", readable: "ñah" }],
            "ट": [{ letter: "ट", readable: "Ta" }, { letter: "टा", readable: "Taa" }, { letter: "टि", readable: "Ti" }, { letter: "टी", readable: "Tee" }, { letter: "टु", readable: "Tu" }, { letter: "टू", readable: "Too" }, { letter: "टृ", readable: "Tru" }, { letter: "टे", readable: "Te" }, { letter: "टै", readable: "Tai" }, { letter: "टो", readable: "To" }, { letter: "टौ", readable: "Tau" }, { letter: "टं", readable: "Tam" }, { letter: "टः", readable: "Tah" }],
            "ठ": [{ letter: "ठ", readable: "Tha" }, { letter: "ठा", readable: "Thaa" }, { letter: "ठि", readable: "Thi" }, { letter: "ठी", readable: "Thee" }, { letter: "ठु", readable: "Thu" }, { letter: "ठू", readable: "Thoo" }, { letter: "ठृ", readable: "Thru" }, { letter: "ठे", readable: "The" }, { letter: "ठै", readable: "Thai" }, { letter: "ठो", readable: "Tho" }, { letter: "ठौ", readable: "Thau" }, { letter: "ठं", readable: "Tham" }, { letter: "ठः", readable: "Thah" }],
            "ड": [{ letter: "ड", readable: "Da" }, { letter: "डा", readable: "Daa" }, { letter: "डि", readable: "Di" }, { letter: "डी", readable: "Dee" }, { letter: "डु", readable: "Du" }, { letter: "डू", readable: "Doo" }, { letter: "डृ", readable: "Dru" }, { letter: "डे", readable: "De" }, { letter: "डै", readable: "Dai" }, { letter: "डो", readable: "Do" }, { letter: "डौ", readable: "Dau" }, { letter: "डं", readable: "Dam" }, { letter: "डः", readable: "Dah" }],
            "ढ": [{ letter: "ढ", readable: "Dha" }, { letter: "ढा", readable: "Dhaa" }, { letter: "ढि", readable: "Dhi" }, { letter: "ढी", readable: "Dhee" }, { letter: "ढु", readable: "Dhu" }, { letter: "ढू", readable: "Dhoo" }, { letter: "ढृ", readable: "Dhru" }, { letter: "ढे", readable: "Dhe" }, { letter: "ढै", readable: "Dhai" }, { letter: "ढो", readable: "Dho" }, { letter: "ढौ", readable: "Dhau" }, { letter: "ढं", readable: "Dham" }, { letter: "ढः", readable: "Dhah" }],
            "ण": [{ letter: "ण", readable: "Ṇa" }, { letter: "णा", readable: "Ṇaa" }, { letter: "णि", readable: "Ṇi" }, { letter: "णी", readable: "Ṇee" }, { letter: "णु", readable: "Ṇu" }, { letter: "णू", readable: "Ṇoo" }, { letter: "णृ", readable: "Ṇru" }, { letter: "णे", readable: "Ṇe" }, { letter: "णै", readable: "Ṇai" }, { letter: "णो", readable: "Ṇo" }, { letter: "णौ", readable: "Ṇau" }, { letter: "णं", readable: "Ṇam" }, { letter: "णः", readable: "Ṇah" }],
            "त": [{ letter: "त", readable: "ta" }, { letter: "ता", readable: "taa" }, { letter: "ति", readable: "ti" }, { letter: "ती", readable: "tee" }, { letter: "तु", readable: "tu" }, { letter: "तू", readable: "too" }, { letter: "तृ", readable: "tru" }, { letter: "ते", readable: "te" }, { letter: "तै", readable: "tai" }, { letter: "तो", readable: "to" }, { letter: "तौ", readable: "tau" }, { letter: "तं", readable: "tam" }, { letter: "तः", readable: "tah" }],
            "थ": [{ letter: "थ", readable: "tha" }, { letter: "था", readable: "thaa" }, { letter: "थि", readable: "thi" }, { letter: "थी", readable: "thee" }, { letter: "थु", readable: "thu" }, { letter: "थू", readable: "thoo" }, { letter: "थृ", readable: "thru" }, { letter: "थे", readable: "the" }, { letter: "थै", readable: "thai" }, { letter: "थो", readable: "tho" }, { letter: "थौ", readable: "thau" }, { letter: "थं", readable: "tham" }, { letter: "थः", readable: "thah" }],
            "द": [{ letter: "द", readable: "da" }, { letter: "दा", readable: "daa" }, { letter: "दि", readable: "di" }, { letter: "दी", readable: "dee" }, { letter: "दु", readable: "du" }, { letter: "दू", readable: "doo" }, { letter: "दृ", readable: "dru" }, { letter: "दे", readable: "de" }, { letter: "दै", readable: "dai" }, { letter: "दो", readable: "do" }, { letter: "दौ", readable: "dau" }, { letter: "दं", readable: "dam" }, { letter: "दः", readable: "dah" }],
            "ध": [{ letter: "ध", readable: "dha" }, { letter: "धा", readable: "dhaa" }, { letter: "धि", readable: "dhi" }, { letter: "धी", readable: "dhee" }, { letter: "धु", readable: "dhu" }, { letter: "धू", readable: "dhoo" }, { letter: "धृ", readable: "dhru" }, { letter: "धे", readable: "dhe" }, { letter: "धै", readable: "dhai" }, { letter: "धो", readable: "dho" }, { letter: "धौ", readable: "dhau" }, { letter: "धं", readable: "dham" }, { letter: "धः", readable: "dhah" }],
            "न": [{ letter: "न", readable: "na" }, { letter: "ना", readable: "naa" }, { letter: "नि", readable: "ni" }, { letter: "नी", readable: "nee" }, { letter: "नु", readable: "nu" }, { letter: "नू", readable: "noo" }, { letter: "नृ", readable: "nru" }, { letter: "ने", readable: "ne" }, { letter: "नै", readable: "nai" }, { letter: "नो", readable: "no" }, { letter: "नौ", readable: "nau" }, { letter: "नं", readable: "nam" }, { letter: "नः", readable: "nah" }],
            "प": [{ letter: "प", readable: "pa" }, { letter: "पा", readable: "paa" }, { letter: "पि", readable: "pi" }, { letter: "पी", readable: "pee" }, { letter: "पु", readable: "pu" }, { letter: "पू", readable: "poo" }, { letter: "पृ", readable: "pru" }, { letter: "पे", readable: "pe" }, { letter: "पै", readable: "pai" }, { letter: "पो", readable: "po" }, { letter: "पौ", readable: "pau" }, { letter: "पं", readable: "pam" }, { letter: "पः", readable: "pah" }],
            "फ": [{ letter: "फ", readable: "pha" }, { letter: "फा", readable: "phaa" }, { letter: "फि", readable: "phi" }, { letter: "फी", readable: "phee" }, { letter: "फु", readable: "phu" }, { letter: "फू", readable: "phoo" }, { letter: "फृ", readable: "phru" }, { letter: "फे", readable: "phe" }, { letter: "फै", readable: "phai" }, { letter: "फो", readable: "pho" }, { letter: "फौ", readable: "phau" }, { letter: "फं", readable: "pham" }, { letter: "फः​", readable: "phah" }],
            "ब": [{ letter: "ब", readable: "ba" }, { letter: "बा", readable: "baa" }, { letter: "बि", readable: "bi" }, { letter: "बी", readable: "bee" }, { letter: "बु", readable: "bu" }, { letter: "बू", readable: "boo" }, { letter: "बृ", readable: "bru" }, { letter: "बे", readable: "be" }, { letter: "बै", readable: "bai" }, { letter: "बो", readable: "bo" }, { letter: "बौ", readable: "bau" }, { letter: "बं", readable: "bam" }, { letter: "बः​", readable: "bah" }],
            "भ": [{ letter: "भ", readable: "bha" }, { letter: "भा", readable: "bhaa" }, { letter: "भि", readable: "bhi" }, { letter: "भी", readable: "bhee" }, { letter: "भु", readable: "bhu" }, { letter: "भू", readable: "bhoo" }, { letter: "भृ", readable: "bhru" }, { letter: "भे", readable: "bhe" }, { letter: "भै", readable: "bhai" }, { letter: "भो", readable: "bho" }, { letter: "भौ", readable: "bhau" }, { letter: "भं", readable: "bham" }, { letter: "भः", readable: "bhah" }],
            "म": [{ letter: "म्", readable: "m-" }, { letter: "म", readable: "ma" }, { letter: "मा", readable: "maa" }, { letter: "मि", readable: "mi" }, { letter: "मी", readable: "mee" }, { letter: "मु", readable: "mu" }, { letter: "मू", readable: "moo" }, { letter: "मृ", readable: "mru" }, { letter: "मे", readable: "me" }, { letter: "मै", readable: "mai" }, { letter: "मो", readable: "mo" }, { letter: "मौ", readable: "mau" }, { letter: "मं", readable: "mam" }, { letter: "मः", readable: "mah" }],
            "य": [{ letter: "य", readable: "ya" }, { letter: "या", readable: "yaa" }, { letter: "यि", readable: "yi" }, { letter: "यी", readable: "yee" }, { letter: "यु", readable: "yu" }, { letter: "यू", readable: "yoo" }, { letter: "यृ", readable: "yru" }, { letter: "ये", readable: "ye" }, { letter: "यै", readable: "yai" }, { letter: "यो", readable: "yo" }, { letter: "यौ", readable: "yau" }, { letter: "यं", readable: "yam" }, { letter: "यः", readable: "yah" }],
            "र": [{ letter: "र", readable: "ra" }, { letter: "रा", readable: "raa" }, { letter: "रि", readable: "ri" }, { letter: "री", readable: "ree" }, { letter: "रु", readable: "ru" }, { letter: "रू", readable: "roo" }, { letter: "रृ", readable: "rru" }, { letter: "रे", readable: "re" }, { letter: "रै", readable: "rai" }, { letter: "रो", readable: "ro" }, { letter: "रौ", readable: "rau" }, { letter: "रं", readable: "ram" }, { letter: "रः", readable: "rah" }],
            "ल": [{ letter: "ल", readable: "la" }, { letter: "ला", readable: "laa" }, { letter: "लि", readable: "li" }, { letter: "ली", readable: "lee" }, { letter: "लु", readable: "lu" }, { letter: "लू", readable: "loo" }, { letter: "लृ", readable: "lru" }, { letter: "ले", readable: "le" }, { letter: "लै", readable: "lai" }, { letter: "लो", readable: "lo" }, { letter: "लौ", readable: "lau" }, { letter: "लं", readable: "lam" }, { letter: "लः", readable: "lah" }],
            "ळ": [{ letter: "ळ", readable: "La" }, { letter: "ळा", readable: "Laa" }, { letter: "ळि", readable: "Li" }, { letter: "ऴी", readable: "Lee" }, { letter: "ळु", readable: "Lu" }, { letter: "ळू", readable: "Loo" }, { letter: "ळृ", readable: "Lru" }, { letter: "ळे", readable: "Le" }, { letter: "ळै", readable: "Lai" }, { letter: "ळो", readable: "Lo" }, { letter: "ळौ", readable: "Lau" }, { letter: "ळं", readable: "Lam" }, { letter: "ळः", readable: "Lah" }],
            "ह": [{ letter: "ह", readable: "ha" }, { letter: "हा", readable: "haa" }, { letter: "हि", readable: "hi" }, { letter: "ही", readable: "hee" }, { letter: "हु", readable: "hu" }, { letter: "हू", readable: "hoo" }, { letter: "हृ", readable: "hru" }, { letter: "हे", readable: "he" }, { letter: "है", readable: "hai" }, { letter: "हो", readable: "ho" }, { letter: "हौ", readable: "hau" }, { letter: "हं", readable: "ham" }, { letter: "हः​", readable: "hah" }],
            "व": [{ letter: "व", readable: "va" }, { letter: "वा", readable: "vaa" }, { letter: "वि", readable: "vi" }, { letter: "वी", readable: "vee" }, { letter: "वु", readable: "vu" }, { letter: "वू", readable: "voo" }, { letter: "वृ", readable: "vru" }, { letter: "वे", readable: "ve" }, { letter: "वै", readable: "vai" }, { letter: "वो", readable: "vo" }, { letter: "वौ", readable: "vau" }, { letter: "वं", readable: "vam" }, { letter: "वः", readable: "vah" }],
            "श": [{ letter: "श", readable: "śa" }, { letter: "शा", readable: "śaa" }, { letter: "शि", readable: "śi" }, { letter: "शी", readable: "śee" }, { letter: "शु", readable: "śu" }, { letter: "शू", readable: "śoo" }, { letter: "शृ", readable: "śru" }, { letter: "शे", readable: "śe" }, { letter: "शै", readable: "śai" }, { letter: "शो", readable: "śo" }, { letter: "शौ", readable: "śau" }, { letter: "शं", readable: "śam" }, { letter: "शः", readable: "śah" }],
            "ष": [{ letter: "ष", readable: "Ṣa" }, { letter: "षा", readable: "Ṣaa" }, { letter: "षि", readable: "Ṣi" }, { letter: "षी", readable: "Ṣee" }, { letter: "षु", readable: "Ṣu" }, { letter: "षू", readable: "Ṣoo" }, { letter: "षृ", readable: "Ṣru" }, { letter: "षे", readable: "Ṣe" }, { letter: "षै", readable: "Ṣai" }, { letter: "षो", readable: "Ṣo" }, { letter: "षौ", readable: "Ṣau" }, { letter: "षं", readable: "Ṣam" }, { letter: "षः", readable: "Ṣah" }],
            "स": [{ letter: "स", readable: "sa" }, { letter: "सा", readable: "saa" }, { letter: "सि", readable: "si" }, { letter: "सी", readable: "see" }, { letter: "सु", readable: "su" }, { letter: "सू", readable: "soo" }, { letter: "सृ", readable: "sru" }, { letter: "से", readable: "se" }, { letter: "सै", readable: "sai" }, { letter: "सो", readable: "so" }, { letter: "सौ", readable: "sau" }, { letter: "सं", readable: "sam" }, { letter: "सः", readable: "sah" }],
            "क़": [{ letter: "क़", readable: "qa" }, { letter: "क़ा", readable: "qaa" }, { letter: "क़ि", readable: "qi" }, { letter: "क़ी", readable: "qee" }, { letter: "क़ु", readable: "qu" }, { letter: "क़ू", readable: "qoo" }, { letter: "क़ृ", readable: "qru" }, { letter: "क़े", readable: "qe" }, { letter: "क़ै", readable: "qai" }, { letter: "क़ो", readable: "qo" }, { letter: "क़ौ", readable: "qau" }, { letter: "क़ं", readable: "qam" }, { letter: "क़ः", readable: "qah" }],
            "ख़": [{ letter: "ख़", readable: "Qha" }, { letter: "ख़ा", readable: "Qhaa" }, { letter: "ख़ि", readable: "Qhi" }, { letter: "ख़ी", readable: "Qhee" }, { letter: "ख़ु", readable: "Qhu" }, { letter: "ख़ू", readable: "Qhoo" }, { letter: "ख़ृ", readable: "Qhru" }, { letter: "ख़े", readable: "Qhe" }, { letter: "ख़ै", readable: "Qhai" }, { letter: "ख़ो", readable: "Qho" }, { letter: "ख़ौ", readable: "Qhau" }, { letter: "ख़ं", readable: "Qham" }, { letter: "ख़ः", readable: "Qhah" }],
            "ग़": [{ letter: "ग़", readable: "Ga" }, { letter: "ग़ा", readable: "Gaa" }, { letter: "ग़ि", readable: "Gi" }, { letter: "ग़ी", readable: "Gee" }, { letter: "ग़ु", readable: "Gu" }, { letter: "ग़ू", readable: "Goo" }, { letter: "ग़ृ", readable: "Gru" }, { letter: "ग़े", readable: "Ge" }, { letter: "ग़ै", readable: "Gai" }, { letter: "ग़ो", readable: "Go" }, { letter: "ग़ौ", readable: "Gau" }, { letter: "ग़ं", readable: "Gam" }, { letter: "ग़ः", readable: "Gah" }],
            "ज़": [{ letter: "ज़", readable: "za" }, { letter: "ज़ा", readable: "zaa" }, { letter: "ज़ि", readable: "zi" }, { letter: "ज़ी", readable: "zee" }, { letter: "ज़ु", readable: "zu" }, { letter: "ज़ू", readable: "zoo" }, { letter: "ज़ृ", readable: "zru" }, { letter: "ज़े", readable: "ze" }, { letter: "ज़ै", readable: "zai" }, { letter: "ज़ो", readable: "zo" }, { letter: "ज़ौ", readable: "zau" }, { letter: "ज़ं", readable: "zam" }, { letter: "ज़ः", readable: "zah" }],
            "ड़": [{ letter: "ड़", readable: "Da" }, { letter: "ड़ा", readable: "Daa" }, { letter: "ड़ि", readable: "Di" }, { letter: "ड़ी", readable: "Dee" }, { letter: "ड़ु", readable: "Du" }, { letter: "ड़ू", readable: "Doo" }, { letter: "ड़ृ", readable: "Dru" }, { letter: "ड़े", readable: "De" }, { letter: "ड़ै", readable: "Dai" }, { letter: "ड़ो", readable: "Do" }, { letter: "ड़ौ", readable: "Dau" }, { letter: "ड़ं", readable: "Dam" }, { letter: "ड़ः", readable: "Dah" }],
            "ढ़": [{ letter: "ढ़", readable: "Dha" }, { letter: "ढ़ा", readable: "Dhaa" }, { letter: "ढ़ि", readable: "Dhi" }, { letter: "ढ़ी", readable: "Dhee" }, { letter: "ढ़ु", readable: "Dhu" }, { letter: "ढ़ू", readable: "Dhoo" }, { letter: "ढ़ृ", readable: "Dhru" }, { letter: "ढ़े", readable: "Dhe" }, { letter: "ढ़ै", readable: "Dhai" }, { letter: "ढ़ो", readable: "Dho" }, { letter: "ढ़ौ", readable: "Dhau" }, { letter: "ढ़ं", readable: "Dham" }, { letter: "ढ़ः", readable: "Dhah" }],
            "फ़": [{ letter: "फ़", readable: "fa" }, { letter: "फ़ा", readable: "faa" }, { letter: "फ़ि", readable: "fi" }, { letter: "फ़ी", readable: "fee" }, { letter: "फ़ु", readable: "fu" }, { letter: "फ़ू", readable: "foo" }, { letter: "फ़ृ", readable: "fru" }, { letter: "फ़े", readable: "fe" }, { letter: "फ़ै", readable: "fai" }, { letter: "फ़ो", readable: "fo" }, { letter: "फ़ौ", readable: "fau" }, { letter: "फ़ं", readable: "fam" }, { letter: "फ़ः", readable: "fah" }]
        };

        // Content
        this.processConsonants();
    }
    HindiProcessor.prototype.processConsonants = function () {
        var _this = this;
        var getFirstConsanantKey = function (firstConsanant) {
            return firstConsanant.readable.substr(0, firstConsanant.readable.length - 1);
        };

        _.each(this.readableLetters, function (value, key) {
            _this.readableToHindiLetters[value] = key;
        }, this);

        _.each(this.secondaryLetters, function (value, key) {
            _this.readableToSecondaryHindiLetters[value] = key;
        }, this);

        _.each(this.consanants, function (consanantsArray) {
            var readable = getFirstConsanantKey(consanantsArray[0]);
            var letter = consanantsArray[0].letter + "्";

            this.readableToHindiLetters[readable] = letter;

            this.readableLetters[letter] = readable;

            _.each(consanantsArray, function (readableConsanant) {
                this.readableLetters[readableConsanant.letter] = readableConsanant.readable;
                this.readableToHindiLetters[readableConsanant.readable] = readableConsanant.letter;
            }, this);
        }, this);
    };

    HindiProcessor.prototype.getLastMatch = function (word) {
        var match = new Match();

        if (word.length > 1) {
            for (var i = 0; i < word.length; i++) {
                var sub = word.substr(0, i + 1);
                var letter = this.readableToHindiLetters[sub];

                var secondary = null;

                if (!letter && i > 0) {
                    secondary = this.readableToSecondaryHindiLetters[sub];
                    if (secondary) {
                        letter = this.readableToHindiLetters[sub.substr(0, sub.length - 1)] + this.readableToSecondaryHindiLetters[word.substr(sub.length - 1)];
                    }
                }

                if (letter) {
                    match.letter = letter;
                    match.sub = sub;
                    match.found = true;
                    match.index = i + 1;
                    continue;
                }
            }
        } else {
            var letter = this.readableToHindiLetters[word];
            if (letter) {
                match.letter = letter;
                match.sub = word;
                match.found = true;
                match.index = 1;
            }
        }

        return match;
    };

    HindiProcessor.prototype.getHindiWord = function (englishWord) {
        var hindiWord = "";

        var match = this.getLastMatch(englishWord);

        while (match.found) {
            hindiWord += match.letter;

            if (match.index < englishWord.length) {
                englishWord = englishWord.substr(match.index);
            } else if (match.sub == englishWord) {
                englishWord = "";
                break;
            }

            match = this.getLastMatch(englishWord);
        }

        if (englishWord.length > 0) {
            return hindiWord + englishWord;
        }

        return hindiWord;
    };

    HindiProcessor.prototype.getReadableWord = function (hindiWord) {
        var readable = "";

        for (var i = 0; i < hindiWord.length; i++) {
            var c = hindiWord.substr(i, 1);

            if (c == "।" || c == "्" || c == "ा" || c == "ि" || c == "ी" || c == "ु" || c == "ू" || c == "ृ" || c == "े" || c == "ै" || c == "ो" || c == "ौ") {
                var l = this.secondaryLetters[c];
                readable = readable.substr(0, readable.length - 1);

                if (c != "्")
                    readable += l;
            } else {
                var l = this.readableLetters[c];
                readable += l;
            }
        }

        if (readable.length >= 2 && readable.charAt(readable.length - 1) == 'a' && readable.charAt(readable.length - 2) != 'a') {
            readable = readable.substr(0, readable.length - 1);
        }
        return readable;
    };

    HindiProcessor.prototype.isHindiWord = function (word) {
        if (word) {
            for (var i = 0; i < word.length; i++) {
                if (word.charCodeAt(i) < 256)
                    return false;
            }
            return true;
        }
    };
    return HindiProcessor;
})(Backbone.Model);
/// <reference path="../lib/typings/backbone/backbone.d.ts" />
/// <reference path="../lib/typings/jasmine/jasmine.d.ts" />
/// <reference path="../lib/typings/jquery/jquery.d.ts" />
/// <reference path="../models/Hindiprocessor.ts/" />
describe("Hindi Readability", function () {
    var processor = new HindiProcessor();

    it("People who know English can read Hindi", function () {
        var expected = processor.getReadableWord("सुन्दर");
        expect(expected).toBe("sundar");
        //इमली
    });
});

(function () {
    // from boot.js
    var env = jasmine.getEnv();

    var htmlReporter = new jasmine.HtmlReporter();
    env.addReporter(htmlReporter);

    var specFilter = new jasmine.HtmlSpecFilter();
    env.specFilter = function (spec) {
        return specFilter.matches(spec.getFullName());
    };

    var currentWindowOnload = window.onload;
    window.onload = function () {
        if (currentWindowOnload) {
            currentWindowOnload(null);
        }
        htmlReporter.initialize();
        env.execute();
    };
})();

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;
