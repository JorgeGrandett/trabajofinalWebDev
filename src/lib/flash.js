const flash = {};

flash.load = (req) => {
    const flash = {};
    const msg_err = req.flash('error');
    const msg_scs = req.flash('success');
    const msg_inf = req.flash('info');
    if (msg_err.length > 0 || msg_scs.length > 0 || msg_inf.length > 0) flash.enable = true;
    if (msg_err.length > 0) flash.err = msg_err[0];
    if (msg_scs.length > 0) flash.scs = msg_scs[0];
    if (msg_inf.length > 0) flash.inf = msg_inf[0];
    return flash;
}

module.exports = flash;