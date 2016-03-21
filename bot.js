/* Copyright 2016 Lucas Vasconcelos

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License. */
/* SPOILER ALERT: Sou péssimo com regex(lucaslg26) */
var TelegramBot = require('node-telegram-bot-api');
var htmlToJson = require('html-to-json');


var token = process.argv[2];
var bot = new TelegramBot(token, {
  polling: true
});

var botan = require('botanio')(process.argv[3]);

var cardapioRU = {};

bot.onText(/\/cardapio (.+)?/, function (msg, match) {
  var params = match[1];
  enviarCardapio(msg, 'dia', params);
  botan.track(msg, 'cardapio');
});

bot.onText(/\/cardapio/, function (msg, match) {
  var params = getWeekDay(new Date);
  enviarCardapio(msg, 'dia', params);
  botan.track(msg, 'cardapio');
});

bot.onText(/\/rusemana/, function (msg, match) {
  enviarCardapio(msg);
  botan.track(msg, 'cardapio');
});

bot.onText(/\/ajuda/, function (msg, match) {
  var text = "Um bot feito pelos alunos da UFPA para os alunos da UFPA! Qualquer dúvida ou sugestão, entrar em contato com @vasconcelos\nComandos: \n/cardapio\n/cardapio [dia]\nEx: /cardapio sexta";
  bot.sendMessage(msg.chat.id, text);
  botan.track(msg, 'help');
});

bot.onText(/\/help/, function (msg, match) {
  var text = "Um bot feito pelos alunos da UFPA para os alunos da UFPA! Qualquer dúvida ou sugestão, entrar em contato com @vasconcelos\nComandos: \n/cardapio\n/cardapio [dia]\nEx: /cardapio sexta";
  bot.sendMessage(msg.chat.id, text);
  botan.track(msg, 'help');
});

bot.onText(/\/start/, function (msg, match) {
  var text = "Um bot feito pelos alunos da UFPA para os alunos da UFPA! Qualquer dúvida ou sugestão, entrar em contato com @vasconcelos\nComandos: \n/cardapio\n/cardapio [dia]\nEx: /cardapio sexta";
  bot.sendMessage(msg.chat.id, text);
  botan.track(msg, 'start');
});

cardapioUpdate();
setInterval(cardapioUpdate, 500000);


function enviarCardapio(msg, type, dia) {
  if (!type) {
    var cardapio;
    cardapio = "🍝 Cardápio do RU 🍳\n\n"

    cardapio += "🍽 Almoço\n\n"

    if (cardapioRU.info.almoco.basico) {
      cardapio += "✅ Básico "
    } else {
      cardapio += "❌ Básico "
    }

    if (cardapioRU.info.almoco.profissional) {
      cardapio += "✅ Profissional\n"
    } else {
      cardapio += "❌ Profissional\n"
    }

    cardapio += "\n🍴 Jantar\n\n"

    if (cardapioRU.info.jantar.basico) {
      cardapio += "✅ Básico "
    } else {
      cardapio += "❌ Básico "
    }

    if (cardapioRU.info.jantar.profissional) {
      cardapio += "✅ Profissional\n"
    } else {
      cardapio += "❌ Profissional\n"
    }

    cardapio += "\nAviso: "
    cardapio += cardapioRU.info.aviso
    cardapio += "\n";

    cardapio += "\n😟 Segunda-feira\n"
    cardapio += "\n🍽 Almoço\n"

    for (var i in cardapioRU.cardapio.segunda.almoco) {
      cardapio += cardapioRU.cardapio.segunda.almoco[i] + "\n";
    }

    cardapio += "\n🍴 Jantar\n"

    for (var i in cardapioRU.cardapio.segunda.jantar) {
      cardapio += cardapioRU.cardapio.segunda.jantar[i] + "\n";
    }

    cardapio += "\n😐 Terça-feira\n"
    cardapio += "\n🍽 Almoço\n"

    for (var i in cardapioRU.cardapio.terca.almoco) {
      cardapio += cardapioRU.cardapio.terca.almoco[i] + "\n";
    }

    cardapio += "\n🍴 Jantar\n"

    for (var i in cardapioRU.cardapio.terca.jantar) {
      cardapio += cardapioRU.cardapio.terca.jantar[i] + "\n";
    }

    cardapio += "\n😅 Quarta-feira\n"
    cardapio += "\n🍽 Almoço\n"

    for (var i in cardapioRU.cardapio.quarta.almoco) {
      cardapio += cardapioRU.cardapio.quarta.almoco[i] + "\n";
    }

    cardapio += "\n🍴 Jantar\n"

    for (var i in cardapioRU.cardapio.quarta.jantar) {
      cardapio += cardapioRU.cardapio.quarta.jantar[i] + "\n";
    }

    cardapio += "\n😁 Quinta-feira\n"
    cardapio += "\n🍽 Almoço\n"

    for (var i in cardapioRU.cardapio.quinta.almoco) {
      cardapio += cardapioRU.cardapio.quinta.almoco[i] + "\n";
    }

    cardapio += "\n🍴 Jantar\n"

    for (var i in cardapioRU.cardapio.quinta.jantar) {
      cardapio += cardapioRU.cardapio.quinta.jantar[i] + "\n";
    }

    cardapio += "\n😆 Sexta-feira\n"
    cardapio += "\n🍽 Almoço\n"

    for (var i in cardapioRU.cardapio.sexta.almoco) {
      cardapio += cardapioRU.cardapio.sexta.almoco[i] + "\n";
    }

    cardapio += "\n🍴 Jantar\n"

    for (var i in cardapioRU.cardapio.sexta.jantar) {
      cardapio += cardapioRU.cardapio.sexta.jantar[i] + "\n";
    }

    bot.sendMessage(msg.chat.id, cardapio);
  } else if (type == 'dia') {
    if (cardapioRU.cardapio[dia]) {
      var cardapio;
      cardapio = "🍝 Cardápio do RU 🍳\n"
      cardapio += "\nAviso: "
      cardapio += cardapioRU.info.aviso
      cardapio += "\n\n🍽 Almoço\n"

      for (var i in cardapioRU.cardapio[dia].almoco) {
        if(cardapioRU.cardapio[dia].almoco[i].length === 0){
          cardapio += 'Não será servido almoço 😟\n';
          break;
        }
        cardapio += cardapioRU.cardapio[dia].almoco[i] + "\n";
      }

      cardapio += "\n🍴 Jantar\n"

      for (var i in cardapioRU.cardapio[dia].jantar) {
        if(cardapioRU.cardapio[dia].jantar[i].length === 0){
          cardapio += 'Não será servido jantar 😟\n';
          break;
        }
        cardapio += cardapioRU.cardapio[dia].jantar[i] + "\n";
      }
      bot.sendMessage(msg.chat.id, cardapio, {
         "disable_web_page_preview": 1
      });
    }
  }
}

function getWeekDay(date) {
  var days = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado']
  return days[date.getDay()]
}

function cardapioUpdate() {
  var promise = htmlToJson.request('http://ru.ufpa.br/index.php?option=com_content&view=article&id=7', {
    'dia_da_semana': ['tbody tr', function($doc) {
        return $doc.find('td').eq(0).text().replace(/\n/g, " ").replace(/\r/g, "").replace(/\. /g, "").replace(/^\s+|\s+$|\s+(?=\s)/g, "");
    }],
    'almoco': ['tbody tr', function($doc) {
        return $doc.find('td').eq(1).text().replace(/\n/g, " ").replace(/\r/g, "").replace(/\. /g, "; ").replace(/^\s+|\s+$|\s+(?=\s)/g, "");
    }],
    'jantar': ['tbody tr', function($doc) {
        return $doc.find('td').eq(2).text().replace(/\n/g, " ").replace(/\r/g, "").replace(/\. /g, "; ").replace(/^\s+|\s+$|\s+(?=\s)/g, "");
    }]
});


promise.done(function(result) {
    cardapioRU = {};
    cardapioRU['cardapio'] = {};
    cardapioRU['info'] = {};
    var ruDisponivel = {};
    var dateParser = result.dia_da_semana.slice(1, 3);
    var date_ano = /(\b[0-9]{4,4}\b)/.exec(dateParser[0])[1];
    var date_de = /(\b[0-9]{2})\/(\b[0-9]{2})/.exec(dateParser[0]);
    var almocoParser = /\bALMOÇO(.+)JANTAR/.exec(result.dia_da_semana[1]);
    var jantarParser = /JANTAR(.+)/.exec(result.dia_da_semana[1]);
    var horarioAlmoco = /([0-9][0-9]:[0-9][0-9]) ÀS ([0-9][0-9]:[0-9][0-9])/.exec(almocoParser[1]).slice(1, 3);
    var horarioJanta = /([0-9][0-9]:[0-9][0-9]) ÀS ([0-9][0-9]:[0-9][0-9])/.exec(jantarParser[1]).slice(1, 3);
    var aviso = /Aviso: (.+)/.exec(result.dia_da_semana[1]);
    aviso = (aviso ? aviso[1] : "Sem avisos");
    var dias = result.dia_da_semana.slice(3, 8);
    var almoco = result.almoco.slice(4, 9);
    var jantar = result.jantar.slice(4, 9);
    var aux;

    ruDisponivel = {
        almoco: {
            horario_de: horarioAlmoco[0],
            horario_ate: horarioAlmoco[1],
            basico: (almocoParser[1].indexOf("BÁSICO") > -1) ? true : false,
            profissional: (almocoParser[1].indexOf("PROFISSIONAL") > -1) ? true : false
        },
        jantar: {
            horario_de: horarioJanta[0],
            horario_ate: horarioJanta[1],
            basico: (jantarParser[1].indexOf("BÁSICO") > -1) ? true : false,
            profissional: (jantarParser[1].indexOf("PROFISSIONAL") > -1) ? true : false
        },
        aviso: aviso ? aviso : false
    }
    for (var i in almoco)
        almoco[i] = almoco[i].split("; ");
    for (var i in jantar)
        jantar[i] = jantar[i].split("; ");
    for (var i in almoco) {
        for (var j in almoco[i]) {
            if (j == 0) {
                aux = almoco[i];
                almoco[i] = [];
                var arrSplit = /(\b[A-Z0-9Ã \/]{3,}\b) (.+)/.exec(aux[0]);
                if (!arrSplit) arrSplit = ["", "", aux[0]];
                almoco[i].push(arrSplit[1]);
                var farofaChecker = /([A-z\s/ãáàéèíìõóòúù]+)\s(Farofa)|(Farofa)\s([A-z\s/ãáàéèíìõóòúù]+)/g.exec(arrSplit[2])
                if (farofaChecker) {
                    almoco[i].push(farofaChecker[1]);
                    almoco[i].push(farofaChecker[2]);
                } else {
                    almoco[i].push(arrSplit[2]);
                }
            } else {
                var farofaChecker = /([A-z\s/ãáàéèíìõóòúù]+)\s(Farofa)|(Farofa)\s([A-z\s/ãáàéèíìõóòúù]+)/g.exec(aux[j]);
                if (farofaChecker) {
                    if (farofaChecker[1] && farofaChecker[2]) {
                        almoco[i].push(farofaChecker[1]);
                        almoco[i].push(farofaChecker[2]);
                    } else {
                        almoco[i].push(farofaChecker[3]);
                        almoco[i].push(farofaChecker[4]);
                    }
                } else {
                    almoco[i].push(aux[j]);
                }
            }
            if (aux.length - 1 == j) {
                if (almoco[i][almoco[i].length - 1])
                    almoco[i][almoco[i].length - 1] = almoco[i][almoco[i].length - 1].replace(/\;/, "");
            }
        }
    }
    for (var i in jantar) {
        for (var j in jantar[i]) {
            if (j == 0) {
                aux = jantar[i];
                jantar[i] = [];
                var arrSplit = /(\b[A-Z0-9Ã \/]{3,}\b) (.+)/.exec(aux[0]);
                if (!arrSplit) arrSplit = [, "", aux[0]];
                jantar[i].push(arrSplit[1]);
                var farofaChecker = /([A-z\s/ãáàéèíìõóòúù]+)\s(Farofa)|(Farofa)\s([A-z\s/ãáàéèíìõóòúù]+)/g.exec(arrSplit[2])
                if (farofaChecker) {
                    jantar[i].push(farofaChecker[1]);
                    jantar[i].push(farofaChecker[2]);
                } else {
                    jantar[i].push(arrSplit[2]);
                }
            } else {
                var farofaChecker = /([A-z\s/ãáàéèíìõóòúù]+)\s(Farofa)|(Farofa)\s([A-z\s/ãáàéèíìõóòúù]+)/g.exec(aux[j]);
                if (farofaChecker) {
                    if (farofaChecker[1] && farofaChecker[2]) {
                        jantar[i].push(farofaChecker[1]);
                        jantar[i].push(farofaChecker[2]);
                    } else {
                        jantar[i].push(farofaChecker[3]);
                        jantar[i].push(farofaChecker[4]);
                    }
                } else {
                    jantar[i].push(aux[j]);
                }
            }
            if (aux.length - 1 == j) {
                if (jantar[i][jantar[i].length - 1])
                    jantar[i][jantar[i].length - 1] = jantar[i][jantar[i].length - 1].replace(/\;/, "");
            }
        }
    }
    for (var i in dias) {
        var dateSoma = parseInt(date_de[1]) + parseInt(i);
        if (dateSoma < 9)
            dateSoma = '0' + dateSoma;
        dias[i] = dias[i].toLowerCase().replace('ç', 'c');
        var data = new Date(parseInt(date_ano), parseInt(date_de[2]-1), dateSoma);
        cardapioRU['cardapio'][dias[i]] = {
            data: (data.getDate() > 9 ? data.getDate() : '0' + data.getDate()) + '/' + ((data.getMonth()+1) > 9 ? data.getMonth() : '0' + data.getMonth()) + '/' + data.getFullYear(),
            almoco: almoco[i],
            jantar: jantar[i]
        }
    }
    cardapioRU['info'] = ruDisponivel;
});

}
