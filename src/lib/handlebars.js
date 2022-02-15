const Handlebars = require("handlebars");

Handlebars.registerHelper('forCycle_actionspoints', function () {
    var str = '<table>';
    for (i = 0; i < 10; i++) {
        str += '<tr>';
        str += '<td>' + (i+1) + '</td>';
        str += '<td class="td-check"><input type="checkbox" name="checkTask' + (i+1) +'"></td>';
        str += '<td class="td-tast"><textarea name="task' + (i+1) + '" placeholder="tarea"></textarea></td>';
        str += '<td class="td-datetime"><label for="dateAction">Fecha de vencimiento:</label><br><input type="datetime-local" name="dateAction' + (i+1) + '"></td>';
        str += '<td class="td-progress"><textarea name="progress' + (i+1) + '" placeholder="Progreso"></textarea></td>';
        str += '</tr>';
    }
    str += '</table>'
    return new Handlebars.SafeString(str);
  });