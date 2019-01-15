// Todo
// add list of GSheet urls for Entity master data lists

'use strict'

var sheetConfig = (function () {

    var entityTypes = [
     'Place',
     'Person',
     'Organization',
     'Role',
     'Measure',
     'Indicator',
     'Scorecard',
     'Project',
     'Task',
     'Strategy',
     'Event',
     'Note',
     'Concept'
    // , 
    // 'ConceptScheme'
  ]
    //var combinedOutfile = {"@graph":""}

    var s3jsonld = "https://s3.amazonaws.com/transformrockford/combinedJSONLD.jsonld";

    var sheetURLS = {
        'Place': {
            "id": "12t_s2qFn_dHeXmojIOwozBlZUC7MIQlsFJCQlicJQCo",
            "full": "https://docs.google.com/spreadsheets/d/12t_s2qFn_dHeXmojIOwozBlZUC7MIQlsFJCQlicJQCo",
            "simple": "https://docs.google.com/spreadsheets/u/1/d/12t_s2qFn_dHeXmojIOwozBlZUC7MIQlsFJCQlicJQCo/gviz/tq?tqx=out:html&tq&gid=2 ",
            "csv": "http://spreadsheets.google.com/tq?tqx=out:csv&key=12t_s2qFn_dHeXmojIOwozBlZUC7MIQlsFJCQlicJQCo",
            "json": "https://spreadsheets.google.com/tq?&tq=&key=12t_s2qFn_dHeXmojIOwozBlZUC7MIQlsFJCQlicJQCo&gid=2"
        },
        'Person': {
            "id": "1ROPHtKuQVsTVSAH4rPCoNF8afyX7zFfI60APVmVwaeI",
            "full": "https://docs.google.com/spreadsheets/d/1ROPHtKuQVsTVSAH4rPCoNF8afyX7zFfI60APVmVwaeI",
            "simple": "https://docs.google.com/spreadsheets/u/1/d/1ROPHtKuQVsTVSAH4rPCoNF8afyX7zFfI60APVmVwaeI/gviz/tq?tqx=out:html&tq&gid=2 ",
            "csv": "http://spreadsheets.google.com/tq?tqx=out:csv&key=1ROPHtKuQVsTVSAH4rPCoNF8afyX7zFfI60APVmVwaeI",
            "json": "https://spreadsheets.google.com/tq?&tq=&key=1ROPHtKuQVsTVSAH4rPCoNF8afyX7zFfI60APVmVwaeI&gid=2"
        },
        'Organization': {
            "id": "1D429pIUcstk9hHXLFncWKzmPf0bB5drHUD3VuFo9JRg",
            "full": "https://docs.google.com/spreadsheets/d/1D429pIUcstk9hHXLFncWKzmPf0bB5drHUD3VuFo9JRg",
            "simple": "https://docs.google.com/spreadsheets/u/1/d/1D429pIUcstk9hHXLFncWKzmPf0bB5drHUD3VuFo9JRg/gviz/tq?tqx=out:html&tq&gid=2 ",
            "csv": "http://spreadsheets.google.com/tq?tqx=out:csv&key=1D429pIUcstk9hHXLFncWKzmPf0bB5drHUD3VuFo9JRg",
            "json": "https://spreadsheets.google.com/tq?&tq=&key=1D429pIUcstk9hHXLFncWKzmPf0bB5drHUD3VuFo9JRg&gid=2"
        },
        "Role": {
            "id": "1Nt0nG1zNDqlpAnCQ0w5MFxqo5hlYSBx_TmdZv5RWKa8",
            "full": "https://docs.google.com/spreadsheets/d/1Nt0nG1zNDqlpAnCQ0w5MFxqo5hlYSBx_TmdZv5RWKa8",
            "simple": "https://docs.google.com/spreadsheets/u/1/d/1Nt0nG1zNDqlpAnCQ0w5MFxqo5hlYSBx_TmdZv5RWKa8/gviz/tq?tqx=out:html&tq&gid=2 ",
            "csv": "http://spreadsheets.google.com/tq?tqx=out:csv&key=1Nt0nG1zNDqlpAnCQ0w5MFxqo5hlYSBx_TmdZv5RWKa8",
            "json": "https://spreadsheets.google.com/tq?&tq=&key=1Nt0nG1zNDqlpAnCQ0w5MFxqo5hlYSBx_TmdZv5RWKa8&gid=2"
        },
        "Measure": {
            "id": "1GxnNgcWsxpHAUNai4ze2eEIOWaAmLpb97iosztHa6Ts",
            "full": "https://docs.google.com/spreadsheets/d/1GxnNgcWsxpHAUNai4ze2eEIOWaAmLpb97iosztHa6Ts",
            "simple": "https://docs.google.com/spreadsheets/u/1/d/1GxnNgcWsxpHAUNai4ze2eEIOWaAmLpb97iosztHa6Ts/gviz/tq?tqx=out:html&tq&gid=2 ",
            "csv": "http://spreadsheets.google.com/tq?tqx=out:csv&key=1GxnNgcWsxpHAUNai4ze2eEIOWaAmLpb97iosztHa6Ts",
            "json": "https://spreadsheets.google.com/tq?&tq=&key=1GxnNgcWsxpHAUNai4ze2eEIOWaAmLpb97iosztHa6Ts&gid=2"
        },
        "Indicator": {
            "id": "1Vod362xQ__GehFbVfO3FrgN0Nawu4Nv74DeC5yPjjfw",
            "full": "https://docs.google.com/spreadsheets/d/1Vod362xQ__GehFbVfO3FrgN0Nawu4Nv74DeC5yPjjfw",
            "simple": "https://docs.google.com/spreadsheets/u/1/d/1Vod362xQ__GehFbVfO3FrgN0Nawu4Nv74DeC5yPjjfw/gviz/tq?tqx=out:html&tq&gid=2 ",
            "csv": "http://spreadsheets.google.com/tq?tqx=out:csv&key=1Vod362xQ__GehFbVfO3FrgN0Nawu4Nv74DeC5yPjjfw",
            "json": "https://spreadsheets.google.com/tq?&tq=&key=1Vod362xQ__GehFbVfO3FrgN0Nawu4Nv74DeC5yPjjfw&gid=2"
        },
        "Scorecard": {
            "id": "1TYIEIYL7xaB9l6vAdo2KZKG_-D52Mb2x-uAeQBj_HE4",
            "full": "https://docs.google.com/spreadsheets/d/1TYIEIYL7xaB9l6vAdo2KZKG_-D52Mb2x-uAeQBj_HE4",
            "simple": "https://docs.google.com/spreadsheets/u/1/d/1TYIEIYL7xaB9l6vAdo2KZKG_-D52Mb2x-uAeQBj_HE4/gviz/tq?tqx=out:html&tq&gid=2 ",
            "csv": "http://spreadsheets.google.com/tq?tqx=out:csv&key=1TYIEIYL7xaB9l6vAdo2KZKG_-D52Mb2x-uAeQBj_HE4",
            "json": "https://spreadsheets.google.com/tq?&tq=&key=1TYIEIYL7xaB9l6vAdo2KZKG_-D52Mb2x-uAeQBj_HE4&gid=2"
        },
        "Project": {
            "id": "1g6gX8PTrAYFr2jWn3wpbv33xzjjOWg_sEwWLqeXnOD4",
            "full": "https://docs.google.com/spreadsheets/d/1g6gX8PTrAYFr2jWn3wpbv33xzjjOWg_sEwWLqeXnOD4",
            "simple": "https://docs.google.com/spreadsheets/u/1/d/1g6gX8PTrAYFr2jWn3wpbv33xzjjOWg_sEwWLqeXnOD4/gviz/tq?tqx=out:html&tq&gid=2",
            "csv": "http://spreadsheets.google.com/tq?tqx=out:csv&key=1g6gX8PTrAYFr2jWn3wpbv33xzjjOWg_sEwWLqeXnOD4",
            "json": "https://spreadsheets.google.com/tq?&tq=&key=1g6gX8PTrAYFr2jWn3wpbv33xzjjOWg_sEwWLqeXnOD4&gid=2"
        },
        "Task": {
            "id": "1OWtH5WnP26EbRtJxcCFg1J6GLUjYoq18nxk-sL0ivPQ",
            "full": "https://docs.google.com/spreadsheets/d/1OWtH5WnP26EbRtJxcCFg1J6GLUjYoq18nxk-sL0ivPQ",
            "simple": "https://docs.google.com/spreadsheets/u/1/d/1OWtH5WnP26EbRtJxcCFg1J6GLUjYoq18nxk-sL0ivPQ/gviz/tq?tqx=out:html&tq&gid=2",
            "csv": "http://spreadsheets.google.com/tq?tqx=out:csv&key=1OWtH5WnP26EbRtJxcCFg1J6GLUjYoq18nxk-sL0ivPQ",
            "json": "https://spreadsheets.google.com/tq?&tq=&key=1OWtH5WnP26EbRtJxcCFg1J6GLUjYoq18nxk-sL0ivPQ&gid=2"
        },
        "Strategy": {
            "id": "1McrkGZKZq-ofDY64Nv4bd6C2G10qMr5yJrm7yzbcLxo",
            "full": "https://docs.google.com/spreadsheets/d/1McrkGZKZq-ofDY64Nv4bd6C2G10qMr5yJrm7yzbcLxo",
            "simple": "https://docs.google.com/spreadsheets/u/1/d/1McrkGZKZq-ofDY64Nv4bd6C2G10qMr5yJrm7yzbcLxo/gviz/tq?tqx=out:html&tq&gid=2",
            "csv": "http://spreadsheets.google.com/tq?tqx=out:csv&key=1McrkGZKZq-ofDY64Nv4bd6C2G10qMr5yJrm7yzbcLxo",
            "json": "https://spreadsheets.google.com/tq?&tq=&key=1McrkGZKZq-ofDY64Nv4bd6C2G10qMr5yJrm7yzbcLxo&gid=2"
        },
        'Event': {
            "id": "1_3gx8nU97biF5m5w9WQskvqtbdGAHUI8TZGObtBxdw8",
            "full": "https://docs.google.com/spreadsheets/d/1_3gx8nU97biF5m5w9WQskvqtbdGAHUI8TZGObtBxdw8",
            "simple": "https://docs.google.com/spreadsheets/u/1/d/1_3gx8nU97biF5m5w9WQskvqtbdGAHUI8TZGObtBxdw8/gviz/tq?tqx=out:html&tq&gid=2 ",
            "csv": "http://spreadsheets.google.com/tq?tqx=out:csv&key=1_3gx8nU97biF5m5w9WQskvqtbdGAHUI8TZGObtBxdw8",
            "json": "https://spreadsheets.google.com/tq?&tq=&key=1_3gx8nU97biF5m5w9WQskvqtbdGAHUI8TZGObtBxdw8&gid=2"
        },
        "Note": {
            "id": "1h97g6nOnJILxZiuEk_mriKyAanMluS7ne17szQy2Tps",
            "full": "https://docs.google.com/spreadsheets/d/1h97g6nOnJILxZiuEk_mriKyAanMluS7ne17szQy2Tps",
            "simple": "https://docs.google.com/spreadsheets/u/1/d/1h97g6nOnJILxZiuEk_mriKyAanMluS7ne17szQy2Tps/gviz/tq?tqx=out:html&tq&gid=2",
            "csv": "http://spreadsheets.google.com/tq?tqx=out:csv&key=1h97g6nOnJILxZiuEk_mriKyAanMluS7ne17szQy2Tps",
            "json": "https://spreadsheets.google.com/tq?&tq=&key=1h97g6nOnJILxZiuEk_mriKyAanMluS7ne17szQy2Tps&gid=2"
        },
        'Concept': {
            "id": "1763MKtMMPePsQ-FbSAnO9guMsuiSANJcYed3QqdXRlE",
            "full": "https://docs.google.com/spreadsheets/d/1763MKtMMPePsQ-FbSAnO9guMsuiSANJcYed3QqdXRlE",
            "simple": "https://docs.google.com/spreadsheets/u/1/d/1763MKtMMPePsQ-FbSAnO9guMsuiSANJcYed3QqdXRlE/gviz/tq?tqx=out:html&tq&gid=2 ",
            "csv": "http://spreadsheets.google.com/tq?tqx=out:csv&key=1763MKtMMPePsQ-FbSAnO9guMsuiSANJcYed3QqdXRlE",
            "json": "https://spreadsheets.google.com/tq?&tq=&key=1763MKtMMPePsQ-FbSAnO9guMsuiSANJcYed3QqdXRlE&gid=2"
        }
        // ,
        // 'ConceptScheme': {
        //   "id": "1_k3nm0DSRwo5iWelhU_DfiwleHTLN5Z9guFJ1FF6s38",
        //   "full": "https://docs.google.com/spreadsheets/d/1_k3nm0DSRwo5iWelhU_DfiwleHTLN5Z9guFJ1FF6s38",
        //   "simple": "https://docs.google.com/spreadsheets/u/1/d/1_k3nm0DSRwo5iWelhU_DfiwleHTLN5Z9guFJ1FF6s38/gviz/tq?tqx=out:html&tq&gid=2 ",
        //   "csv": "http://spreadsheets.google.com/tq?tqx=out:csv&key=1_k3nm0DSRwo5iWelhU_DfiwleHTLN5Z9guFJ1FF6s38",
        //   "json": "https://spreadsheets.google.com/tq?&tq=&key=1_k3nm0DSRwo5iWelhU_DfiwleHTLN5Z9guFJ1FF6s38&gid=2"
        // }
    }

    return {

        // getCombinedOutfile: function () {
        //     return combinedOutfile ;
        // },

        getEntityTypeList: function () {
            return entityTypes;
        },

        getSheetList: function () {
            return sheetURLS;
        }
    };
})();
module.exports = sheetConfig;
