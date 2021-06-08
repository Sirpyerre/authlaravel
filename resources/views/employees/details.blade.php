@extends("layouts.pdfLayout")

@section("content")
    <div class="report-header">
        <h3>Employee information card</h3>
        <p>@monoforms</p>
    </div>

    <div class="report-body">
        <div class="info">
            <p>Full Name: {{$employee->name}} {{$employee->first_name}} {{$employee->second_name}}</p>
            <p>Email: {{$employee->email}}</p>
            <p>Phone: {{$employee->phone}}</p>
            <p>Birthdate: {{$employee->birthday}}</p>
            <p>Salary: $ {{$employee->salary}}</p>
        </div>
        <div class="obs">
            <p>Position: {{$employee->position->title}}</p>
        </div>
    </div>
    @if ($picture)
        <div class="report-photo">
            <img src="{{$picture}}" width="50%"/>
        </div>
    @endif
    <div class="report-footer">
        <a href="https://www.monoforms.com/" target="_blank">@monoforms</a> - All Rights reserved.
    </div>
@endsection
