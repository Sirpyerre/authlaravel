<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <style type="text/css">
        body{
            width: 800px;
            margin: 0;
            padding: 0;
            font-size: 16px;
            line-height: 24px;
            font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
            color: rgb(33,33,33);
        }
        .report-header{
            width: 700px;
            background: rgb(55,39,114);
            color: rgb(255,255,255);
            padding: 15px;
            box-sizing: border-box;
            display: block;
            position: relative;
        }
        .report-header .logo{
            position: absolute;
            top: 40px;
            left: 15px;
            width: 150px;
        }
        .report-footer{
            width: 700px;
            background: rgb(55,39,114);
            color: rgb(255,255,255);
            padding: 15px;
            box-sizing: border-box;
            display: block;
            position: relative;
        }
        .report-body{
            width: 40%;
            display: inline-block;
            position: relative;
            padding: 15px;
            box-sizing: border-box;
            vertical-align: top;
        }
        .report-photo{
            width: 58%;
            display: inline-block;
            position: relative;
            vertical-align: top;
            box-sizing: border-box;
            margin-top: 15px;
        }
        .report-photo img{
            width: 60%;
        }
        .report-body .info p{
            border: rgb(204,204,204) solid 1px;
            padding: 5px;
            display: block;
            position: relative;
        }
    </style>
</head>
<body>
    @yield('content')
</body>
</html>
