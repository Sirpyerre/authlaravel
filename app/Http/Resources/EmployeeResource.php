<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        $position = $this->position->title;
        return [
            'id' => $this->id,
            'name' => $this->name,
            'firstName' => $this->first_name,
            'secondName' => $this->second_name,
            'email' => $this->email,
            'birthday' => $this->birthday,
            'phone' => $this->phone,
            'position' => $position,
            'salary' => $this->salary,
        ];
    }
}
