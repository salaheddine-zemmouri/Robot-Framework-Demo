*** Settings ***
Library  SeleniumLibrary

*** Variables ***
${URL}          https://1c41-41-248-194-211.eu.ngrok.io
${BOOKNAME}     Book Title
${AUTHOR}       Salah Eddine ZEMMOURI
${ISBN}         123

*** Test Cases ***

AddBookTest
    Open Browser    ${URL}
    Set Browser Implicit Wait   5
    # # ngrok continue button
    Click Button    xpath=//span[contains(text(),"Visit Site")]/ancestor::button[@class="ant-btn ant-btn-primary"]
    Set Browser Implicit Wait   5
    Click Button    xpath=//button[@id="btn-addBook"]
    Input Text  id=title    ${BOOKNAME}
    Input Text  id=author   ${AUTHOR}
    Input Text  id=isbn     ${ISBN}
    Click Button    xpath=//button[@id="btn-submitAddBook"]
    Table Cell Should Contain    xpath=//table[@class="table"]   2   1   ${BOOKNAME}
    Table Cell Should Contain    xpath=//table[@class="table"]   2   2   ${AUTHOR}
    Table Cell Should Contain    xpath=//table[@class="table"]   2   3   ${ISBN}


    Log     Test completed