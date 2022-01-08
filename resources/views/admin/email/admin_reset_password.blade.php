
url('admin')

@component('mail::message')
# Reset Account
Welcome {{ $data['data']->name }} <br>
The body of your message.

@component('mail::button', ['url' => url('/admin/reset/password/'. $data['token'])])
Click Here To Reset Your Password
@endcomponent
Or <br>
copy this link
<a href="{{ url('admin/reset/password/'. $data['token']) }}">{{ '/admin/reset/password/'.$data['token'] }}</a>

Thanks,<br>
{{ config('app.name') }}
@endcomponent

