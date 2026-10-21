export var Environment;
(function (Environment) {
    Environment[Environment["local"] = 0] = "local";
    Environment["development"] = "DEVELOPMENT";
    Environment["production"] = "PRODUCTION";
    Environment["staging"] = "STAGING";
})(Environment || (Environment = {}));
