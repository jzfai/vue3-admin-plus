
export default {
    mounted(el, binding) {
        if (typeof binding.value !== 'function') {
            throw 'callback must be a function';
        }
        el.__handleClick__ = function (e) {
            if (el.contains(e.target)) {
                binding.value(false);
            }
            else {
                binding.value(true);
            }
        };
        document.addEventListener('click', el.__handleClick__);
    },
    beforeUnmount(el) {
        document.removeEventListener('click', el.__handleClick__);
    }

}
