$(function() {
  var form = layui.form

  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ],
    samePwd: function(value) {
      if(value === $('[name=oldPwd]')) {
        return '新旧密码不能相同！'
      }
    },
    rePwd: function(value) {
      if(value !== $('[name=newPwd]')) {
        return '两次密码不一致！'
      }
    }
  })

  // 表单提交事件
  $('.layui-form').on('submit', function(e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function(res) {
        if(res.status !== 0) {
          return layui.layer.msg('更新密码失败！')
        }
        layui.layer.msg('更新密码成功！')
        // 重置表单(调用原生dom表单的reset方法)
        $('.layui-form')[0].reset()
      }
    })
  })
})