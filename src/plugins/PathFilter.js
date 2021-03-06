/**
 * Filters are special bits of Code that can be used in templates to mutate data
 * These are global and can be used anywhere, put filters here that will be
 * used throughout the app, DO NOT put code here that is super specialized or will
 * only be used in one spot.. use your best judgement
 */
export default {
    install(Vue) {
        Vue.filter('formatDate', function (date) {
            if (date instanceof Date) {
                return date.toLocaleDateString();
            } else {
                var d = new Date(date);
                return d ? d.toLocaleDateString() : '';
            }
        });
        Vue.filter('formatCurrency', function (value) {
            if (typeof value !== "number") {
                return value;
            }
            var formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2
            });
            return formatter.format(value);
        });
        Vue.filter('toLowerCase', function (value) {
            if (typeof value !== "string")
                return '';

            return value.toLowerCase();
        });
        Vue.filter('toUpperCase', function (value) {
            if (typeof value !== "string")
                return '';

            return value.toUpperCase();
        });
    }
}

