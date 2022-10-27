$('#dodajForm').submit(function(){ //koristi jquary api za pisanje ajaxa
    event.preventDefault();  
    console.log("Dodaj je pokrenuto");
    const $form = $(this);  //this - dodajForm
    const $inputs = $form.find('input, select, button, textarea');
    const serijalizacija = $form.serialize();
    let red_za_unos = $form.serializeArray().reduce(function(json, {name, value}){ //kreira objekat koji mi dobijamo iz forme, u json formatu
        json[name]=value;
        return json;
    }) //reduce - da bismo json-ifikovali savki obj uzet iz forme
    console.log("Red za unos");
    console.log(red_za_unos);
    console.log(serijalizacija);
    
    request = $.ajax({
        url:'handler/add.php',
        type:'post',
        data:serijalizacija
    });

    request.done(function(response, textStatus, jqXHR){
        if(response==="Success"){
            alert("Kolokvijum je zakazan");
            console.log("Uspesno zakazivanje");
            //location.reload(true); -  ne zelimo da se refreshuje stranica
            appendRow(red_za_unos);
        }
        else console.log("Kolokvijum nije zakazan "+ response);
        console.log(response);
    });

    request.fail(function(jqXHR, textStatus, errorThrown){
        console.error('Sledeca greska se desila: '+textStatus, errorThrown)
    });

});

function appendRow(row){
    $.get("handler/getLast.php", function(data){ //ovako radis get
        console.log(data);
        $("#pregled tbody").append(
            //koristis ` ` da bi vise redova kopirali, iz home.php
            //menjas php tagove sa ${...}
            ` 
            <tr>
                    <td> ${ row.value} </td>
                    <td>${ row.katedra} </td>
                    <td>${ row.sala} </td>
                    <td>${ row.datum} </td>
                    <td>
                        <label class="custom-radio-btn">
                            <input type="radio" name="checked-donut" value=${data} >
                            <span class="checkmark"></span>
                        </label>
                    </td>

                </tr>
            `
        );
    });
}