$(function()
{
    $.get("/node_actions",function(data)
{
    console.log(data);
    $('#info').append(data);
})
})