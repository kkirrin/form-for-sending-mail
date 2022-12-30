"use strict"

document.addEventListener('DOMContentLoaded',function(){
    const form = document.getElementById('form')
    form.addEventListener('submit',formSend)


    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form)

        let formData = new FormData(form)
        formData.append('image', formImage.files[0])




        if(error === 0 ){
            form.classList.add('_sending')
            let response = await fetch('sendmail.php',{ 
                
                method: 'POST',
                body: formData,
            })

            if(response.ok) {
                form.classList.add('_sending')
                let result = await response.json()
                alert(result.message)
                formPrewiew.innerHTML = "";
                form.classList.add('_sending')
                form.reset()

            }else {
                alert('Ошибка')
                form.classList.remove('_sending')
            }

             
        }else {
            alert('Заполните выделенные поля')
        }
    }
    
    function formValidate(form){
        let error = 0;
        let formReq = document.querySelectorAll('._req')

        for(let index = 0; index < formReq.length; index++) {
            const input = formReq[index]
            formRemoveError(input)

            
        if(input.classList.contains('_email')){
            if(emailTest(input)){
                formAddError(input)
                error++
            }
        } else if(input.getAttribute("type") === "checkbox" && input.checked === false){
            formAddError(input)
            error++
        } else {
            if(input.value === '') {
                formAddError(input)
                error++
            }
        }
    }

    return error;


    }


    function formAddError(input) {
        input.parentElement.classList.add('_error')
        input.classList.add('_error')
    }


    function formRemoveError(input) {   
        input.parentElement.classList.remove('_error')
        input.classList.remove('_error')
    }


 
    // Функция теста email
    function emailTest(input){
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
    }

    // Получаем инпут file в переменную 
    const formImage = document.getElementById('formPhoto')
    // Получаем 
    const formPrewiew = document.getElementById('formPrewiew')



    // Слушаем изменения в инпуте file 
    formImage.addEventListener('change', ()=> {
        uploadFile(formImage.files[0])
    })


    function uploadFile(file){
        //Проверяем файл 
        if(!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
            alert("Разрешены только фотографии")
            form.value = '';
            return
        }

        // Проверим размер 
        if(file.size > 2 * 1024 * 1024) {
            alert('Размер должен быть не более 2 Мб')
            return;
        }


        let reader =  new FileReader();

        reader.onload = function(e) {
            formPrewiew.innerHTML = `<img src="${e.target.result}" alt="Фото">`
        }

        reader.onerror = function(e) {
            alert('Ошибка')
        }

        reader.readAsDataURL(file)


    }
})




