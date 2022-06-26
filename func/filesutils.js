(function () {
    var FileSUtils = {}
    FileSUtils.verifyDecoyFiles = function () {
        //return number of decoy files not in place
        //return 0 for all files in place
        //return -1 for no files found
        return 0;
    }
    FileSUtils.deleteDecoyFiles = function (locs) {
        // delete all the reacheable decoy files (return the number of unreached ones)
        var fso = Eng.Fso;
        var counter = 0;
        for (var i = 0; i < locs.length; i++) {
            var pa = Env.mountPath(locs[i]);
            if (fso.FolderExists(pa)) {
                var file = pa + "\\"+ Cfg.decoyFilename;
                if (!fso.FileExists(file)) { counter++; continue; }
                var act = fso.GetFile(file);
                act.Delete();
            }
        }
        if (counter != 0) { alert("WARNING: " + counter + " decoy files were not found"); }
        return counter;
    }
    FileSUtils.createDecoyFiles = function (locs, content) {
        // create decoy files in specified locs
        var tf;
        var fso = Eng.Fso;
        for (var i = 0; i < locs.length; i++) {
            var pa = Env.mountPath(locs[i]);
            if (fso.FolderExists(pa)) {
                var filenm = pa + "\\"+ Cfg.decoyFilename;
                tf = fso.CreateTextFile(filenm, true);
                tf.Write(content);
                tf.Close();
                Fso.switchFileAttribute(filenm, "hidden", true);
            }
        }
        return 0;
    }

    return FileSUtils;
}).call();
